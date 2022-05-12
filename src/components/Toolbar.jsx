
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import {
  Calendar as BigCalendar,
  Views,
  momentLocalizer,
} from 'react-big-calendar';
import _ from 'lodash';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);
export function addMonths(date, months) {
    const d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    console.log(date);
    return date;
  }
  
  export function addWeeks(date, weeks) {
    date.setDate(date.getDate() + 7 * weeks);
    return date;
  }
  
  export function addDays(date, days) {
    date.setDate(date.getDate() + days);
    console.log(date);
    return date;
  }


const CustomToolbar = (props) => {
  const [viewState, setViewState] = useState('month');

  const goToBack = () => {
    if (viewState === 'month') {
      props.onNavigate('prev', addMonths(props.date, -1));
    } else if (viewState === 'week') {
      props.onNavigate('prev', addWeeks(props.date, -1));
    } else {
      props.onNavigate('prev', addDays(props.date, -1));
    }
  };

  const goToNext = () => {
    if (viewState === 'month') {
      props.onNavigate('next', addMonths(props.date, +1));
    } else if (viewState === 'week') {
      props.onNavigate('next', addWeeks(props.date, +1));
    } else {
      props.onNavigate('next', addDays(props.date, +1));
    }
  };

  const goToToday = () => {
    const now = new Date();
    props.date.setMonth(now.getMonth());
    props.date.setYear(now.getFullYear());
    props.date.setDate(now.getDate());
    props.onNavigate('current');
  };

  return (
    <div>
      <label>{moment(props.date).format("YYYY年M月")}</label>

      <div>
        <button onClick={goToToday}>today</button>
        <button onClick={goToBack}>&#8249;</button>
        <button onClick={goToNext}>&#8250;</button>
      </div>
    </div>
  );
};

export default CustomToolbar;