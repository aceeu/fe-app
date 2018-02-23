
// class Intervals
// {
//     var $identificator;
//     var $localname;
//     var $from;
//     var $to;

//     function __construct($identificator_, $localname_,$from_,$to_)
//     {
//         $this->identificator = $identificator_;
//         $this->localname = $localname_;
//         $this->from = $from_;
//         $this->to = $to_;
//     }
// }


// $durations=[
//     'thisday'=>new Intervals('thisday',"За текущий день",date("Y-m-d"),TOMMOROW_DATE),
//     'thisweek'=>new Intervals('',"За текущую неделю",date('Y-m-d', strtotime(date('Y').'W'.date('W').'1')),TOMMOROW_DATE),
//     'thismonth'=>new Intervals('',"За текущий месяц",date("Y-m-01"),TOMMOROW_DATE),
//     'lastmonth'=>new Intervals('',"За последние 30 дней",strftime('%Y-%m-%d',time()-30*24*60*60),TOMMOROW_DATE),
//     'lastyear'=>new Intervals('',"За последний год",date("Y-01-01"),TOMMOROW_DATE)
// ];


const CATEGORIES = [
    '',
    'Еда',
    'Ипотека',
    'Проезд',
    'Бытовая химия',
    'Лекарства',
    'Мебель',
    'Развлечения',
    'Одежда',
    'Машина Митсубиси',
    'Коммунальные',
    'Подарки',
    'Ремонт',
    'Баумана12',
    'Сене в школу',
    'Лизе в школу',
    'Маше в садик',
    'Прочее'
];

const BAYERS = [
    "",
    "Общие",
    "Аня",
    "Женя",
    "Сеня",
    "Лиза"
];

const TARGET = [
    '',
    'Лизе',
    'Сене',
    'Маше',
    'Ане',
    'Жене',
    'Родителям Ани',
    'Родителям Жени'
];

    // function GetIntervalForMonth($Y,$m)
    // {
    //     $firstMonthday = strtotime($Y."-".$m."-01");
    //     $nextMonth = $m+1;
    //     if($nextMonth>12)
    //     {
    //         $nextMonth=1;
    //         ++$Y;
    //     }
    //     $lastMonthDayNum = strtotime($Y."-".$nextMonth."-01");
    //     return new Intervals('',"За месяц (".$m.") год (".$Y.")",$firstMonthday,$lastMonthDayNum);
    // }

    // function option_helper($var,$opt_val)
    // {
    //     global $fails_text;
    //     if(empty($fails_text)==false && (strcmp($var,$opt_val)==0))
    //         return " selected ";
    //     else
    //         return "";
    // }

    // function add_option($var,$opt_val)
    // {
    //     $sel = option_helper($var,$opt_val);
    //     echo "<option $sel value=\"$opt_val\">$opt_val</option>";
    // }