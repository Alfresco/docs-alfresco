# Business Calendar

Use the business calendar when calculating due dates for tasks.

You can override the default business calendar implementation, for example, to include bank holidays, company holidays, and so on. To override the default implementation, add a Spring bean implementing the *com.activiti.api.calendar.BusinessCalendarService* to the classpath with the *@Primary* notation.

Check the Javadoc on the *BusinessCalendarService* for more information.

```
@Primary
@Service
public class MyBusinessCalendarService implements BusinessCalendarService {

  ...

}
```

Below is an example implementation that takes weekend days into account when calculating due dates.

```
@Primary
@Service
public class SkipWeekendsBusinessCalendar implements BusinessCalendarService {

    protected static final int DAYS_IN_WEEK = 7;
    protected List<Integer> weekendDayIndex;

    protected DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

    public SkipWeekendsBusinessCalendar() {

        // add Saturday and Sunday as weekend days
        weekendDayIndex.add(6);
        weekendDayIndex.add(7);
    }

    public Date addToDate(Date date, int years, int months, int days, int hours, int minutes, int seconds) {
        return calculateDate(new DateTime(date), years, months, days, hours, minutes, seconds, 1);
    }

    public Date subtractFromDate(Date date, int years, int months, int days, int hours, int minutes, int seconds) {
        return calculateDate(new DateTime(date), years, months, days, hours, minutes, seconds, -1);
    }

    protected Date calculateDate(DateTime relativeDate, int years, int months, int days, int hours, int minutes, int seconds, int step) {
        // if date is on a weekend skip to a working day
        relativeDate = skipWeekEnds(relativeDate, step);
        Period period = new Period(years, months, 0, days, hours, minutes, seconds, 0);

        // add weekends to period
        period = period.plusDays(countWeekEnds(relativeDate, period, step));

        // add/subtract period to get the final date, again if date is on a weekend skip to a working day
        return skipWeekEnds(addPeriod(relativeDate, period, step), step).toDate();
    }

    protected DateTime addPeriod(DateTime relativeDate, Period period, int step) {
        if (step < 0) {
            return relativeDate.minus(period);
        }
        return relativeDate.plus(period);
    }

    protected DateTime skipWeekEnds(DateTime relativeDate, int step) {
        while(weekendDayIndex.contains(relativeDate.getDayOfWeek())) {
            relativeDate = relativeDate.plusDays(step);
        }
        return relativeDate;
    }

    protected int countWeekEnds(DateTime relativeDate, Period period, int step) {
        // get number of days between two dates
        int days = Math.abs(Days.daysBetween(relativeDate, addPeriod(relativeDate, period, step)).getDays());
        int count = 0;

        for(int weekendDay : weekendDayIndex) {
            count+=countWeekDay(relativeDate, weekendDay, days, step);
        }
        return count;
    }

    protected int countWeekDay(DateTime relativeDate, int weekDay, int days, int step) {
        int count = 0;
        DateTime dt = relativeDate.toDateTime();

        // if date's day of week is not the target day of week
        // skip to target day of week
        if(weekDay != relativeDate.getDayOfWeek()) {
            int daysToSkip = 0;

            if (step > 0) {
                if (weekDay > relativeDate.getDayOfWeek()) {
                    daysToSkip = weekDay - relativeDate.getDayOfWeek();
                } else {
                    daysToSkip = weekDay - relativeDate.getDayOfWeek() + DAYS_IN_WEEK;
                }
            } else {
                if (weekDay > relativeDate.getDayOfWeek()) {
                    daysToSkip = Math.abs(weekDay - relativeDate.getDayOfWeek() - DAYS_IN_WEEK);
                } else {
                    daysToSkip = relativeDate.getDayOfWeek() - weekDay;
                }
            }

            // return if target day of week is beyond range of days
            if (daysToSkip > days) {
                return 0;
            }

            count++;
            dt = dt.plusDays(daysToSkip * step);
            days-=daysToSkip;
        }

        if (days>=DAYS_IN_WEEK) {
            dt = dt.plusDays(days * step);
            count+=(Weeks.weeksBetween(relativeDate, dt).getWeeks() * step);
        }

        return count;
    }

    @Override
    public DateFormat getStringVariableDateFormat() {
        return dateFormat;
    }
```

**Parent topic:**[Hook points](../topics/hook_points.md)

