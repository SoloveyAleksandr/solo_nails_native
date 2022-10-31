import moment from "moment";
import {
  useState,
  useEffect,
  FC,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native"
import { IMonth } from "../types";
import {
  color,
  fonts,
} from "../constants";

interface ICalendar {
  selMonth: number,
  selYear: number
}

const Calendar: FC<ICalendar> = ({
  selMonth,
  selYear,
}) => {
  moment.updateLocale('en', {
    week: {
      dow: 1,
    },
  });

  const { width } = useWindowDimensions();

  const [month, setMonth] = useState<IMonth>({
    calendarDays: [],
    month: 0,
    year: 0,
  });

  const getMonth = () => {
    const year = selYear;
    const month = (selMonth + 1).toString().length > 1 ? `${selMonth + 1}` : `0${selMonth + 1}`;

    const startOfWeek = moment(`01.${month}.${year}`, 'DD.MM.YYYY').startOf('month').startOf('week').subtract(1, 'day');
    const calendarDays = [...Array(42)].map(() => {
      const day = startOfWeek.add(1, 'day').clone();
      const dayFormat = day.format('DD.MM.YYYY');
      const dayMonth = day.month() + 1;
      const isWeekend = day.day() === 6 || day.day() === 0 ? true : false;

      const isNextMonth = (dayMonth > Number(month) && day.year() >= year) ||
        (day.year() > year) ? true : false;

      const isPrevMonth = (isNextMonth === false && dayMonth !== Number(month)) ? true : false;

      const isToday = moment().format('DD.MM.YYYY') === dayFormat ? true : false;
      return {
        date: {
          full: Number(day.format('x')),
          formate: dayFormat,
        },
        day: dayFormat.slice(0, 2),
        month: dayFormat.slice(3, 5),
        year: dayFormat.slice(6),
        isWeekend,
        isPrevMonth,
        isNextMonth,
        isToday,
      }
    });

    setMonth({
      calendarDays,
      year: Number(year),
      month: Number(month),
    })
  };

  useEffect(() => {
    getMonth();
  }, [selMonth]);

  return (
    <View style={{
      ...styles.container,
      width: width,
    }}>
      <View style={[styles.weekDays, { width: width - 10 }]}>
        <View style={{ width: (width - 39) / 7, alignItems: 'center', margin: 2 }}>
          <Text style={styles.weekDay}>пн</Text>
        </View>
        <View style={{ width: (width - 39) / 7, alignItems: 'center', margin: 2 }}>
          <Text style={styles.weekDay}>вт</Text>
        </View>
        <View style={{ width: (width - 39) / 7, alignItems: 'center', margin: 2 }}>
          <Text style={styles.weekDay}>ср</Text>
        </View>
        <View style={{ width: (width - 39) / 7, alignItems: 'center', margin: 2 }}>
          <Text style={styles.weekDay}>чт</Text>
        </View>
        <View style={{ width: (width - 39) / 7, alignItems: 'center', margin: 2 }}>
          <Text style={styles.weekDay}>пт</Text>
        </View>
        <View style={{ width: (width - 39) / 7, alignItems: 'center', margin: 2 }}>
          <Text style={styles.weekDay}>сб</Text>
        </View>
        <View style={{ width: (width - 39) / 7, alignItems: 'center', margin: 2 }}>
          <Text style={styles.weekDay}>вс</Text>
        </View>
      </View>
      {month.calendarDays.map(day => (
        <View key={day.date.full}>
          {
            day.isToday ?
              <TouchableOpacity>
                <View
                  style={[
                    { position: 'relative' },
                    day.isNextMonth && styles.prevDay,
                    day.isPrevMonth && styles.prevDay,
                    styles.day,
                    {
                      width: (width - 39) / 7,
                      height: (width - 39) / 7,
                    }
                  ]}>
                  <View style={styles.mark}></View>
                  <Text style={[styles.text, { color: color.white }]}>{day.day}</Text>
                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity>
                <View
                  style={[
                    day.isNextMonth && styles.prevDay,
                    day.isPrevMonth && styles.prevDay,
                    styles.day,
                    {
                      width: (width - 39) / 7,
                      height: (width - 39) / 7,
                    }
                  ]}>
                  <Text style={styles.text}>{day.day}</Text>
                </View>
              </TouchableOpacity>
          }
        </View>
      ))}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    margin: 2,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.white,
    borderWidth: 1,
    backgroundColor: color.white20,
  },
  prevDay: {
    opacity: 0.3
  },
  mark: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: color.greenMark,
    position: 'absolute',
    zIndex: 2,
    top: 5,
    left: 5,
  },
  text: {
    fontFamily: fonts.quanticoBolt,
    fontSize: 14,
    color: color.white,
  },
  weekDays: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  weekDay: {
    color: color.white,
    fontFamily: fonts.robotoBlack,
  }
})

export default Calendar;
