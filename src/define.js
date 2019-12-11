// export const CATEGORIES = [
// категории переехали на сервер db.categories.find() [{cat: '...', entry: 0}, {..}, ...]
// ];

export const BUYERS = [
    'Общие',
    'Аня',
    'Женя'
];

export const TARGET = [
    '',
    'Лизе',
    'Сене',
    'Маше',
    'Ане',
    'Жене',
    'Родителям Ани',
    'Родителям Жени'
];

export const usersMap = {
    'anna': 'Аня',
    'ace': 'Женя'
};

export const DateFormat = 'D MMMM YYYY';

export const Period = {
    lastDay: 1,
    lastWeek: 2,
    thisMonth: 3,
    last30days: 4,
    lastYear: 5
  };

export const timePeriods = [
    {
        name: 'день',
        value: Period.lastDay
    },
    {
        name: 'неделя',
        value: Period.lastWeek
    },
    {
        name: 'месяц',
        value: Period.thisMonth
    },
    {
        name: '30дн',
        value: Period.last30days
    },
    {
        name: 'год',
        value: Period.lastYear
    },
]
