import React, { useState, useEffect, useMemo } from 'react';
import {
  GraduationCap,
  HeartPulse,
  Building2,
  Briefcase,
  Scale,
  Award,
  BookOpen,
  Users,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  HelpCircle,
  RefreshCw,
  Play,
  ArrowRight,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Info,
  Trophy,
  BarChart3,
  Flame,
  Check,
  Zap,
  ShieldCheck,
  ChevronRight,
  Star,
  Eye,
  FileText,
  UserCheck
} from 'lucide-react';

// Ranks Configuration based on accumulated score
const RANKS = [
  { threshold: 0, title: "Қала зерттеушісі", icon: "🔍", color: "from-slate-500 to-slate-700" },
  { threshold: 100, title: "Әділдік қорғаушысы", icon: "🛡️", color: "from-blue-500 to-indigo-700" },
  { threshold: 250, title: "Ашықтық сарапшысы", icon: "👁️", color: "from-cyan-500 to-teal-700" },
  { threshold: 450, title: "Қоғам белсендісі", icon: "⚡", color: "from-amber-500 to-orange-700" },
  { threshold: 700, title: "Әділ қала сәулетшісі", icon: "👑", color: "from-emerald-400 to-green-600" }
];

// Achievements Badges Dataset
const ALL_ACHIEVEMENTS = [
  { id: "first_step", title: "Адал таңдау", description: "Алғашқы тапсырманы дұрыс орындау", icon: "🎯" },
  { id: "risk_detective", title: "Тәуекел детективі", description: "Жемқорлық тәуекелін анықтау тапсырмасын аяқтау", icon: "🔎" },
  { id: "transparency_ambassador", title: "Ашықтық елшісі", description: "Үш аймақты толық аяқтау", icon: "🌟" },
  { id: "justice_defender", title: "Әділдік қорғаушысы", description: "Бес аймақты да сәтті орындау", icon: "🛡️" },
  { id: "city_architect", title: "Қаланың сәулетшісі", description: "Қаланы 100% қалпына келтіру", icon: "🏛️" }
];

// Detailed data for all 5 districts
const ZONES_DATA = [
  {
    id: 1,
    key: "education",
    title: "Білім беру аймағы",
    subtitle: "Мектептер мен университеттердегі адалдық пен ашықтық",
    icon: GraduationCap,
    color: "#3B82F6", // Blue
    bgGlow: "rgba(59, 130, 246, 0.25)",
    pathSvg: "M 150 180 L 350 120 L 380 280 L 180 320 Z",
    centerPos: { x: 260, y: 220 },
    characters: [
      {
        name: "Аружан",
        role: "Мектеп белсендісі",
        avatar: "👩‍🎓",
        dialogue: "Сәлеметсіз бе! Мен - Аружанмын. Мектебімізде емтихан бағаларын ақшаға немесе таныстыққа өзгерту әрекеттері байқалуда. Бұл білімге деген адалдықты жояды. Келіңіз, білім жүйесін бірге тазартайық!"
      },
      {
        name: "Данияр",
        role: "Жас мұғалім",
        avatar: "👨‍🏫",
        dialogue: "Сәлеметсіз бе! Мен - Даниярмын. Әділ де ашық бағалау жүйесі ғана білімді жастарды тәрбиелейді. Ашық рейтингтер мен цифрлық журналдарды енгізуге көмектесіңіз!"
      }
    ],
    scenario: {
      title: "1-тапсырма: Шешімді таңда",
      description: "Сыныптасыңыз емтиханнан жоғары баға алу үшін мұғалімге бағалы сыйлық ұсынуды жоспарлап отыр. Сіз не істейсіз?",
      options: [
        {
          id: "a",
          text: "Сыныптасқа бұл әрекеттің заңсыз әрі әділетсіз екенін түсіндіріп, өз білімімен баға алуға шақыру.",
          isCorrect: true,
          explanation: "Дұрыс! Академиялық адалдық білім сапасының кепілі. Академиялық парақорлық басқа оқушылардың құқығын бұзады."
        },
        {
          id: "b",
          text: "Бұл іске араласпай, үндемей қарап тұру.",
          isCorrect: false,
          explanation: "Қате! Әділетсіздікке белгілі бір дәрежеде көз жұму сыбайлас жемқорлықтың тереңдеуіне жол береді."
        },
        {
          id: "c",
          text: "Жоғары баға алу үшін сыйлықты бірге беруге келісу.",
          isCorrect: false,
          explanation: "Қате! Бұл заң бұзушылыққа қатысу болып табылады және сыбайлас жемқорлық тәуекелін тудырады."
        }
      ]
    },
    riskTask: {
      title: "2-тапсырма: Жемқорлық тәуекелін анықта",
      cardText: "ОҚУ ОРНЫНЫҢ ДЕРЕКТЕРІ:\n«Гранттар мен халықаралық олимпиадаларға қатысушыларды іріктеу жабық эссе түрінде өткізіліп, нәтижелері жарияланбайды. Шешімді тек комиссия төрағасы жеке қабылдайды».",
      question: "Бұл жағдаяттағы негізгі жемқорлық тәуекелін көрсетіңіз:",
      options: [
        {
          id: 1,
          text: "Іріктеу критерийлерінің ашық еместігі және мүдделер қақтығысы тәуекелі.",
          isCorrect: true,
          explanation: "Тамаша! Жабық шешімдер мен бағалаудың ашық еместігі жеке мүдделілікке және парақорлыққа жағдай жасайды."
        },
        {
          id: 2,
          text: "Конкурсқа қатысушы оқушылар санының тым көптігі.",
          isCorrect: false,
          explanation: "Бұл жемқорлық тәуекелі емес, тек ұйымдастырушылық мәселе."
        },
        {
          id: 3,
          text: "Іріктеу кезеңдерінің тым жылдам өтуі.",
          isCorrect: false,
          explanation: "Негізгі заңбұзушылық ашықтықтың жоқтығында жатыр."
        }
      ]
    },
    detectiveTask: {
      title: "3-тапсырма: Ашықтық детективі",
      instruction: "Білім беру мекемесінде ашықтықты қамтамасыз ететін ДҰРЫС 3 ережені таңдап, зерттеу шкаласын толтырыңыз:",
      items: [
        { id: "e1", text: "Бағалау критерийлері мен балл жүйесін алдын ала ашық жариялау", isCorrect: true },
        { id: "e2", text: "Электронды журнал мен қайта қараудың ашық апелляция жүйесін құру", isCorrect: true },
        { id: "e3", text: "Мектеп қорына ерікті-мәжбүрлі түрде қолма-қол ақша жинау", isCorrect: false },
        { id: "e4", text: "Ата-аналар комитетінің қаржылық ашық онлайн есептілігі", isCorrect: true },
        { id: "e5", text: "Бағаны жеке сөйлесу арқылы келісіп қоюға рұқсат ету", isCorrect: false }
      ]
    },
    quiz: [
      {
        question: "Сыбайлас жемқорлыққа қарсы мәдениетті мектепте қалай қалыптастыруға болады?",
        answers: ["Академиялық адалдық клубын құру және ашықтықты қамтамасыз ету", "Емтихандарды мүлдем жою", "Барлық оқушыларға бірдей жоғары баға қою", "Ата-аналардың іске араласуын тоқтату"],
        correct: 0,
        explanation: "Академиялық адалдық клубы мен ашық бағалау жүйесі оқушылардың құқықтық сауаттылығын арттырады."
      },
      {
        question: "Оқу орнында заңсыз қаржы жинау талап етілсе не істеу керек?",
        answers: ["1424 Колл-орталығына немесе білім басқармасына хабарлау", "Тез арада сұралған ақшаны беру", "Сыныптастардан ақша жинап бере салу", "Мектептен біржола кетіп қалу"],
        correct: 0,
        explanation: "Мектепте заңсыз қаржы жинауға тыйым салынған, бұл туралы уәкілетті органдарға хабарлау қажет."
      },
      {
        question: "Мектептегі «Адалдық дүкені» жүйесінің басты мақсаты неде?",
        answers: ["Оқушылардың сатушысыз адалдық пен сенімділігін тәрбиелеу", "Көп пайда табу", "Тауарларды қымбат бағада сату", "Оқушыларды бизнесті үйрету"],
        correct: 0,
        explanation: "«Адалдық дүкені» - сатушысыз, сенімге негізделген адалдық пен өзін-өзі бақылау тәрбиесі."
      },
      {
        question: "Мұғалім оқушыға жеке мүддесі үшін төмен баға қойса, бұл қандай жағдай?",
        answers: ["Мүдделер қақтығысы және этика бұзушылығы", "Қалыпты педагогикалық әдіс", "Оқушының нашар дайындығы", "Нәтижесіз оқыту"],
        correct: 0,
        explanation: "Жеке араздық немесе мүдде үшін бағаны бұрмалау - бұл этика мен заңды бұзу."
      },
      {
        question: "Академиялық адалдық қағидасына не жатпайды?",
        answers: ["Плагиат жасау және біреудің еңбегін көшіру", "Өз бетінше орындау", "Дереккөздерге сілтеме жасау", "Әділ бағалану"],
        correct: 0,
        explanation: "Плагиат пен көшіру академикалық адалдыққа қайшы келеді."
      }
    ]
  },
  {
    id: 2,
    key: "healthcare",
    title: "Денсаулық сақтау аймағы",
    subtitle: "Емханалар мен ауруханалардағы әділ қызмет және медициналық құқық",
    icon: HeartPulse,
    color: "#10B981", // Green
    bgGlow: "rgba(16, 185, 129, 0.25)",
    pathSvg: "M 420 100 L 650 90 L 680 250 L 440 280 Z",
    centerPos: { x: 550, y: 180 },
    characters: [
      {
        name: "Айдана",
        role: "Емделуші азаматша",
        avatar: "👩",
        dialogue: "Сәлеметсіз бе! Мен - Айданамын. Ауруханада тегін көрсетілуі тиіс УЗИ және КТ тексерулеріне кезексіз өту үшін бейресми төлем ұсынылуда. Бұл қарапайым халықтың құқығын бұзады!"
      },
      {
        name: "Ерлан",
        role: "Емхана қызметкері",
        avatar: "👨‍⚕️",
        dialogue: "Сәлеметсіз бе! Мен - Ерлан дәрігермін. Денсаулық сақтау саласы ашық әрі жедел болуы тиіс. Электронды кезек пен тегін дәрі-дәрмектің ашық тізімі жемқорлықты жояды!"
      }
    ],
    scenario: {
      title: "1-тапсырма: Шешімді таңда",
      description: "Дәрігер сізге тегін берілуі тиіс мемлекеттік кепілдендірілген дәрі-дәрмекті 'жоқ' деп айтып, оны өзінен ақылы түрде сатып алуды ұсынды. Не істейсіз?",
      options: [
        {
          id: "a",
          text: "Күмәнді ұсыныстан бас тартып, емхананың пациенттерді қолдау қызметіне немесе 1424 нөміріне хабарлау.",
          isCorrect: true,
          explanation: "Өте дұрыс! Кепілдендірілген тегін медициналық көмек (ТМККК) - әр азаматтың заңды құқығы."
        },
        {
          id: "b",
          text: "Денсаулық маңызды болғандықтан, үндемей сұралған ақшаны төлеп алу.",
          isCorrect: false,
          explanation: "Қате! Бұл заңсыз дәрі сату схемасына мүмкіндік береді."
        },
        {
          id: "c",
          text: "Басқа емделушілерге де осы дәрігерден дәрі сатып алуды кеңес беру.",
          isCorrect: false,
          explanation: "Қате! Бұл заңсыз әрекетті таратуға ықпал етеді."
        }
      ]
    },
    riskTask: {
      title: "2-тапсырма: Жемқорлық тәуекелін анықта",
      cardText: "ЕМХАНА КЕЗЕГІ ДЕРЕКТЕРІ:\n«КТ/МРТ тексерулеріне жазылу дәптері дәрігердің кабинетінде қағаз түрінде ғана жүргізіледі. Азаматтарға 'жедел қарау' үшін белгіленбеген ақы төлеу ұсынылады».",
      question: "Осы картадағы негізгі жемқорлық тәуекелін табыңыз:",
      options: [
        {
          id: 1,
          text: "Электронды цифрлық кезектің болмауы және ақпараттың ашық еместігі.",
          isCorrect: true,
          explanation: "Дұрыс! Кезектің цифрландырылмауы жеке мүдде үшін қолдан кедергі жасауға мүмкіндік береді."
        },
        {
          id: 2,
          text: "Дәрігерлердің жұмыс уақытының ұзақтығы.",
          isCorrect: false,
          explanation: "Бұл жүктеме мәселесі, бірақ жемқорлықтың басты көзі емес."
        },
        {
          id: 3,
          text: "Емхана ғимаратының ескі болуы.",
          isCorrect: false,
          explanation: "Инфраструктура заңсыз төлемдерді ақтамайды."
        }
      ]
    },
    detectiveTask: {
      title: "3-тапсырма: Ашықтық детективі",
      instruction: "Денсаулық сақтау саласындағы ашықтықты арттыратын 3 дұрыс тетікті таңдаңыз:",
      items: [
        { id: "h1", text: "Damumed немесе eGov арқылы бірыңғай ашық электронды кезек", isCorrect: true },
        { id: "h2", text: "Тегін медициналық көмек (ТМККК) тізімін көрнекі стендтерде жариялау", isCorrect: true },
        { id: "h3", text: "Дәрігерге рахмет ретінде сыйлық беруді міндеттеу", isCorrect: false },
        { id: "h4", text: "Дәрі-дәрмек қоры мен қалдығын онлайн режимінде бақылау", isCorrect: true },
        { id: "h5", text: "Кезексіз кіру бағасын касса айналып қолма-қол келісу", isCorrect: false }
      ]
    },
    quiz: [
      {
        question: "ТМККК (Тегін медициналық көмектің кепілдік берілген көлемі) деген не?",
        answers: ["Мемлекет есебінен азаматтарға тегін берілетін медициналық қызметтер тізімі", "Тек ақылы емханалардың қызметі", "Жеке сақтандыру полисі", "Шетелде емделу бағдарламасы"],
        correct: 0,
        explanation: "ТМККК - Конституциямен бекітілген тегін медициналық көмек көлемі."
      },
      {
        question: "Емделушінің ақпараттық келісімі мен құқықтары сақталмаса қайда шағымдануға болады?",
        answers: ["Пациенттерді қолдау қызметіне немесе 1424 байланыс орталығына", "Ештеңе істемей үйге қайту", "Әлеуметтік желіде бейәдеп сөздер жазу", "Тек таныстарға айту"],
        correct: 0,
        explanation: "Емхана ішіндегі Пациенттерді қолдау қызметі алғашқы сатыда мәселені шешуге міндетті."
      },
      {
        question: "Дәрігерге заңды түрде сыйақы немесе сыйлық беруге болады ма?",
        answers: ["Сайланған лауазымдық міндеті үшін сыйлық алуға тыйым салынған", "Кез келген соммада беруге болады", "Тек гүл мен тәттілер беруге болады", "Тек кезексіз қарағанда беруге болады"],
        correct: 0,
        explanation: "Мемлекеттік ұйым қызметкерлеріне кез келген түрдегі сыйақы алуға тыйым салынады."
      },
      {
        question: "Медициналық қызметтің сапасын арттырудың ең тиімді жолы қайсысы?",
        answers: ["Ашықтық, электронды кезек және қоғамдық бақылау", "Тек ақылы қызметтерді көбейту", "Емханаларды жауып тастау", "Қағаз құжаттарды көбейту"],
        correct: 0,
        explanation: "Цифрландыру мен ашықтық сыбайлас жемқорлық тәуекелін едәуір төмендетеді."
      },
      {
        question: "Медициналық рецепт бойынша тегін дәрі берілмесе не істеу қажет?",
        answers: ["Дәріхананың ақпараттық жүйесін тексертіп, фармацевтикалық бақылауға хабарласу", "Басқа қаладан сатып алу", "Дәрі ішуден бас тарту", "Фармацевтке пара беру"],
        correct: 0,
        explanation: "Тегін дәрілік камтамасыз ету жүйесі арнайы бақылауда болады."
      }
    ]
  },
  {
    id: 3,
    key: "public_service",
    title: "Мемлекеттік қызмет аймағы",
    subtitle: "Азаматтарға арналған ХҚКО, eGov және ашық мемлекеттік аппарат",
    icon: Building2,
    color: "#8B5CF6", // Purple
    bgGlow: "rgba(139, 92, 246, 0.25)",
    pathSvg: "M 180 360 L 400 330 L 420 520 L 200 550 Z",
    centerPos: { x: 300, y: 430 },
    characters: [
      {
        name: "Әли",
        role: "Қызмет алушы азамат",
        avatar: "👨‍💼",
        dialogue: "Сәлеметсіз бе! Мен - Әлимін. Жер телімін тіркеу құжаттарын тапсырған едім. Құжаттарды созбалаңға салмай, тез арада 'шешіп беру' үшін делдалдар көмек ұсынды. Ресми жолды таңдауға көмектесіңіз!"
      },
      {
        name: "Меруерт",
        role: "ХҚКО сарапшысы",
        avatar: "👩‍💼",
        dialogue: "Сәлеметсіз бе! Мен - Меруертпін. Мемлекеттік қызметтер цифрлық форматта, ашық әрі жедел көрсетілуі тиіс. Делдалсыз, тура eGov арқылы заңды қызмет алуды қамтамасыз етейік!"
      }
    ],
    scenario: {
      title: "1-тапсырма: Шешімді таңда",
      description: "Халыққа қызмет көрсету орталығының ғимараты жанында бейтаныс 'жылдам көмекші' келіп, анықтаманы 10 минутта жасап беруге бейресми сүйінші сурады. Не істейсіз?",
      options: [
        {
          id: "a",
          text: "Заңсыз делдалдықтан бас тартып, қызметті eGov порталы немесе ресми ХҚКО операторы арқылы алу.",
          isCorrect: true,
          explanation: "Тамаша! Заңсыз делдалдар азаматтарды алдап, сыбайлас жемқорлық схемаларын тудырады."
        },
        {
          id: "b",
          text: "Уақыт үнемдеу үшін делдалға ақша беріп, құжатты тездету.",
          isCorrect: false,
          explanation: "Қате! Бұл пара беру және заңсыз делдалдықты қаржыландыру болып табылады."
        },
        {
          id: "c",
          text: "Бұл туралы достарыңызға айтып, делдалдың нөмірін тарату.",
          isCorrect: false,
          explanation: "Қате! Бұл заңсыз қызметті жарнамалауға жатады."
        }
      ]
    },
    riskTask: {
      title: "2-тапсырма: Жемқорлық тәуекелін анықта",
      cardText: "ҚЫЗМЕТ КӨРСЕТУ ХАТТАМАСЫ:\n«Рұқсат қағаздарын беру комиссиясы өтініштерді жабық есік артында қарап, бас тарту себептерін жазбаша түрде негіздемейді. Мемлекеттік қызметшінің шешіміне шағымдану тетігі көрсетілмеген».",
      question: "Осы жағдаяттағы басты жемқорлық тәуекелін анықтаңыз:",
      options: [
        {
          id: 1,
          text: "Шешім қабылдаудағы субъектілік (адам факторы) және ақпараттық жабықтық.",
          isCorrect: true,
          explanation: "Өте дұрыс! Себепсіз бас тарту және ашықтықтың жоқтығы шенеуніктердің пара талап етуіне жағдай жасайды."
        },
        {
          id: 2,
          text: "Өтініш берушілер санының көптігі.",
          isCorrect: false,
          explanation: "Бұл жемқорлық себебі емес."
        },
        {
          id: 3,
          text: "Ғимараттағы компьютерлердің аздығы.",
          isCorrect: false,
          explanation: "Техникалық жабдықталу ашықтық қағидасын алмастырмайды."
        }
      ]
    },
    detectiveTask: {
      title: "3-тапсырма: Ашықтық детективі",
      instruction: "Мемлекеттік аппараттың ашықтығын қамтамасыз ететін 3 дұрыс құралды таңдаңыз:",
      items: [
        { id: "p1", text: "Е-өтініш платформасы арқылы барлық арыз-шағымдардың ашық мониторингі", isCorrect: true },
        { id: "p2", text: "Азаматтарға мемлекеттік қызметтерді 100% онлайн eGov арқылы ұсыну", isCorrect: true },
        { id: "p3", text: "Құжаттарды қарау мерзімін себепсіз соза беруге рұқсат ету", isCorrect: false },
        { id: "p4", text: "Ашық бюджет порталы арқылы мемлекеттік шығындарды халыққа көрсету", isCorrect: true },
        { id: "p5", text: "Мемлекеттік қызметке конкурсссыз туыстарды орналастыру", isCorrect: false }
      ]
    },
    quiz: [
      {
        question: "Мемлекеттік қызметшінің әдеп кодексінің басты талабы қандай?",
        answers: ["Халыққа адал, ашық, өзімшілдіксіз және әділ қызмет ету", "Тек өз туыстарына көмектесу", "Қызметтік ақпаратты жасыру", "Азаматтардың арыздарын елемеу"],
        correct: 0,
        explanation: "Әдеп кодексі мемлекеттік қызметшінің адалдығы мен халыққа ашықтығын талап етеді."
      },
      {
        question: "eGov.kz порталының сыбайлас жемқорлықты жоюдағы басты рөлі неде?",
        answers: ["Адам факторын жойып, қызметтерді тікелей және ашық көрсету", "Тек жаналықтар жариялау", "Құжаттар бағасын қымбаттату", "Азаматтардың уақытын алу"],
        correct: 0,
        explanation: "Цифрландыру шенеунік пен азамат арасындағы тікелей байланысты жойып, жемқорлықты азайтады."
      },
      {
        question: "Мүдделер қақтығысы дегеніміз не?",
        answers: ["Жеке қызығушылық пен лауазымдық міндеттер арасындағы қайшылық", "Әріптестер арасындағы қарапайым ұрыс", "Жұмыс уақытының аяқталуы", "Тапсырманың кешігуі"],
        correct: 0,
        explanation: "Мүдделер қақтығысы - жеке пайда өзінің лауазымдық міндеттеріне әсер етуі."
      },
      {
        question: "1424 Колл-орталығы не үшін жұмыс істейді?",
        answers: ["Сыбайлас жемқорлық фактілерін хабарлау және тегін консультация алу үшін", "Тамаққа тапсырыс беру үшін", "Ауа райын білу үшін", "Коммуналдық төлем төлеу үшін"],
        correct: 0,
        explanation: "1424 - Сыбайлас жемқорлыққа қарсы қызметтің бірыңғай тегін call-орталығы."
      },
      {
        question: "Мемлекеттік органның ашық бюджеті азаматтарға не береді?",
        answers: ["Салық ақшасының қайда жұмсалып жатқанын бақылау мүмкіндігін", "Ақшаны өз қалауынша жұмсауды", "Шетелге саяхаттауды", "Қаржыны жасыруды"],
        correct: 0,
        explanation: "Ашық бюджет халыққа мемлекеттік қаржының жұмсалуын бақылауға мүмкіндік береді."
      }
    ]
  },
  {
    id: 4,
    key: "employment",
    title: "Еңбек және жұмысқа орналасу",
    subtitle: "Меритократия, әділ іріктеу және еңбек құқықтарын қорғау",
    icon: Briefcase,
    color: "#F59E0B", // Amber
    bgGlow: "rgba(245, 158, 11, 0.25)",
    pathSvg: "M 450 310 L 680 290 L 720 480 L 480 510 Z",
    centerPos: { x: 580, y: 400 },
    characters: [
      {
        name: "Нұрсұлтан",
        role: "Жас маман",
        avatar: "👨‍🎓",
        dialogue: "Сәлеметсіз бе! Мен - Нұрсұлтанмын. Жұмысқа орналасу конкурсында білімім мен тәжірибем жоғары болса да, бос орын басшының танысына берілгелі жатыр. Меритократияны бірге қалпына келтірейік!"
      },
      {
        name: "Самал",
        role: "HR маманы",
        avatar: "👩‍💼",
        dialogue: "Сәлеметсіз бе! Мен - Самалмын. Жұмысқа қабылдау тек шынайы біліктілік пен еңбекке негізделуі тиіс. Непотизм мен таныстыққа қарсы ашық конкурс жүйесін құрайық!"
      }
    ],
    scenario: {
      title: "1-тапсырма: Шешімді таңда",
      description: "Компанияның кадр бөлімі конкурстық тест тапсырмаларын тек белгілі бір үміткерге алдын ала беріп қойғанын білдіңіз. Не істейсіз?",
      options: [
        {
          id: "a",
          text: "Заңбұзушылық туралы комплаенс-службаға немесе еңбек инспекциясына дәлелдермен хабарлау.",
          isCorrect: true,
          explanation: "Өте дұрыс! Тең мүмкіндіктер мен ашық конкурс - меритократияның негізі."
        },
        {
          id: "b",
          text: "Өзіңізге де жауаптарды алдын ала тауып беруді өтіну.",
          isCorrect: false,
          explanation: "Қате! Бұл заңсыз әрекетке серіктес болу деген сөз."
        },
        {
          id: "c",
          text: "Конкурстан бас тартып, үндемей кете беру.",
          isCorrect: false,
          explanation: "Қате! Әділетсіздікке қарсы тұрмау жемқорлық жүйесін нығайтады."
        }
      ]
    },
    riskTask: {
      title: "2-тапсырма: Жемқорлық тәуекелін анықта",
      cardText: "КАДР САЯСАТЫ ДЕРЕКТЕРІ:\n«Мемлекеттік кәсіпорында бос лауазымдарға хабарландыру жарияланбайды. Барлық жаңа қызметкерлер тек басшылықтың жеке ұсынысы мен туыстық байланысы бойынша жұмысқа алынады».",
      question: "Бұл жүйедегі негізгі жемқорлық тәуекелін табыңыз:",
      options: [
        {
          id: 1,
          text: "Непотизм (тамыр-таныстық) және ашық конкурстық іріктеудің жоқтығы.",
          isCorrect: true,
          explanation: "Тамаша! Непотизм мен туыстық таңдау білікті мамандардың жолын бөгейді."
        },
        {
          id: 2,
          text: "Жұмыс орнындағы кабинеттердің тарлығы.",
          isCorrect: false,
          explanation: "Бұл жемқорлық тәуекеліне жатпайды."
        },
        {
          id: 3,
          text: "Кәсіпорынның жұмыс уақытының кестесі.",
          isCorrect: false,
          explanation: "Жұмыс графигі әділ іріктеуге әсер етпейді."
        }
      ]
    },
    detectiveTask: {
      title: "3-тапсырма: Ашықтық детективі",
      instruction: "Еңбек саласында әділдікті камтамасыз ететін 3 дұрыс қағиданы таңдаңыз:",
      items: [
        { id: "w1", text: "Enbek.kz порталында барлық бос орындарды ашық жариялау", isCorrect: true },
        { id: "w2", text: "Конкурстық комиссия отырысын онлайн трансляциялау және видеожазба сақтау", isCorrect: true },
        { id: "w3", text: "Жұмысқа орналасу үшін бірінші айдың жалақысын 'пара' ретінде беру", isCorrect: false },
        { id: "w4", text: "Кәсіпорындарда жемқорлыққа қарсы Комплаенс-қызметті енгізу", isCorrect: true },
        { id: "w5", text: "Лауазымды тек таныс арқылы беру дәстүрін сақтау", isCorrect: false }
      ]
    },
    quiz: [
      {
        question: "Меритократия қағидасы нені білдіреді?",
        answers: ["Адамның тек білімі, қабілеті мен адал еңбегіне қарап жоғарылауы", "Тек туыстары бар адамдардың жұмысқа тұруы", "Ең жасы үлкен қызметкерді таңдау", "Кездейсоқ жеребе тартып таңдау"],
        correct: 0,
        explanation: "Меритократия - жеке еңбек пен біліктілікке негізделген басқару жүйесі."
      },
      {
        question: "Кәсіпорындағы Комплаенс-офицердің басты міндеті не?",
        answers: ["Сыбайлас жемқорлықтың алдын алу және сыбайлас жемқорлыққа қарсы заңдардың сақталуын бақылау", "Тек қызметкерлердің келу уақытын тексеру", "Компанияның жарнамасын жасау", "Басшының тапсырмасын ғана орындау"],
        correct: 0,
        explanation: "Комплаенс-қызмет ұйым ішіндегі сыбайлас жемқорлық тәуекелдерін жоюға жауапты."
      },
      {
        question: "Жұмысқа қабылдауда «Сұраныста бар туыстық байланыс» байқалса не істеу керек?",
        answers: ["Мүдделер қақтығысы туралы басшылыққа хабарлап, бас тартуды талап ету", "Үндемей жұмыс істей беру", "Өз туыстарыңды да шақыру", "Жұмыстан өз еркімен шығу"],
        correct: 0,
        explanation: "Тікелей бағыныстағы туыстық қатынастарға заңнамада тыйым салынған."
      },
      {
        question: "Жұмысқа орналасу кезінде заңсыз ақша талап етілсе бұл қандай қылмыс?",
        answers: ["Пара алу / бопсалау", "Қарапайым келісімшарт", "Басқарушылық қателік", "Сыйақы жинау"],
        correct: 0,
        explanation: "Жұмысқа алу үшін ақша талап ету - бұл қылмыстық құқық бұзушылық."
      },
      {
        question: "Ашық конкурс форматының басты артықшылығы неде?",
        answers: ["Барлық кандидаттарға тең мүмкіндік беру және ең үздік маманды таңдау", "Уақытты созу", "Тек таныстарды жинау", "Қаржы үнемдеу"],
        correct: 0,
        explanation: "Ашық конкурс ең білікті және лайықты кадрды анықтауға жол ашады."
      }
    ]
  },
  {
    id: 5,
    key: "justice",
    title: "Заң және әділдік",
    subtitle: "Құқықтық сауаттылық, сот ашықтығы және заң үстемдігі",
    icon: Scale,
    color: "#EC4899", // Pink
    bgGlow: "rgba(236, 72, 153, 0.25)",
    pathSvg: "M 250 560 L 550 530 L 580 700 L 280 730 Z",
    centerPos: { x: 410, y: 620 },
    characters: [
      {
        name: "Дамир",
        role: "Құқығын қорғаушы азамат",
        avatar: "👨",
        dialogue: "Сәлеметсіз бе! Мен - Дамирмін. Жол ережесін байқамай бұзып алғанда, кейбір өкілдер хаттама толтырмай 'орнында келісуді' ұсынды. Мен заң үстемдігін таңдаймын!"
      },
      {
        name: "Аяулым",
        role: "Заңгер маманы",
        avatar: "👩‍⚖️",
        dialogue: "Сәлеметсіз бе! Мен - Аяулым заңгермін. Құқықтық сауаттылық - сыбайлас жемқорлыққа қарсы ең мықты қалқан. Әрбір азамат өз құқығын заң аясында қорғауды үйренуі тиіс!"
      }
    ],
    scenario: {
      title: "1-тапсырма: Шешімді таңда",
      description: "Азамат әкімшілік айыппұлды хаттамасыз 'жарты бағасына орнында жабу' ұсынысын алды. Бұл жағдайда заңды әрекет қандай?",
      options: [
        {
          id: "a",
          text: "Ұсыныстан үзілді-кесілді бас тартып, хаттама толтыруды талап ету және айыппұлды ресми касса арқылы төлеу.",
          isCorrect: true,
          explanation: "Өте дұрыс! Орнында қолма-қол ақша беру - пара беру қылмысы болып табылады."
        },
        {
          id: "b",
          text: "Ақша үнемдеу үшін заңсыз ұсынысқа келісе салу.",
          isCorrect: false,
          explanation: "Қате! Бұл пара беру болып саналады және қылмыстық жауапкершілікке әкеледі."
        },
        {
          id: "c",
          text: "Өкілмен саудаласып, бағасын одан ары түсіру.",
          isCorrect: false,
          explanation: "Қате! Бұл қылмыстық әрекетті тереңдетеді."
        }
      ]
    },
    riskTask: {
      title: "2-тапсырма: Жемқорлық тәуекелін анықта",
      cardText: "СӨТ ЖҮЙЕСІ ДЕРЕКТЕРІ:\n«Сот отырыстары аудио-бейне жазбасыз жабық өтеді. Істерді судьялар арасында бөлу қолмен жүргізіледі. Судья шешімінің сипаттамалық бөлігі азаматтарға берілмейді».",
      question: "Осы картадағы басты жемқорлық тәуекелін анықтаңыз:",
      options: [
        {
          id: 1,
          text: "Аудио-бейне тіркеудің жоқтығы және істерді субъектілі (қолмен) бөлу.",
          isCorrect: true,
          explanation: "Тамаша! Автоматты түрде іс бөлу мен бейнежазба болмаса, сыбайлас жемқорлық қаупі күрт артады."
        },
        {
          id: 2,
          text: "Сот залындағы орындықтардың аздығы.",
          isCorrect: false,
          explanation: "Бұл жемқорлық емес."
        },
        {
          id: 3,
          text: "Сот процесінің ұзақтығы.",
          isCorrect: false,
          explanation: "Ұзақтығы процедуралық сипатта, бірақ басты жемқорлық тәуекелі ашықтықтың жоқтығында."
        }
      ]
    },
    detectiveTask: {
      title: "3-тапсырма: Ашықтық детективі",
      instruction: "Сот пен заң жүйесіндегі ашықтықты қамтамасыз ететін 3 дұрыс элементті таңдаңыз:",
      items: [
        { id: "j1", text: "IT-Сот арқылы істерді судьялар арасында АВТОМАТТЫ ТҮРДЕ бөлу жүйесі", isCorrect: true },
        { id: "j2", text: "Барлық сот отырыстарын 100% Аудио-бейне тіркеу (АБТ) жүйесімен қамту", isCorrect: true },
        { id: "j3", text: "Сот шешімін пара беру арқылы өзгертуге тырысу", isCorrect: false },
        { id: "j4", text: "Сот актілерінің бірыңғай ашық электронды базасы (Судебный кабинет)", isCorrect: true },
        { id: "j5", text: "Заң бұзушылықты жасырып, пара ұсыну", isCorrect: false }
      ]
    },
    quiz: [
      {
        question: "Қазақстан Республикасында пара бергені үшін қандай жауапкершілік қарастырылған?",
        answers: ["Қылмыстық жауапкершілік (ірі айыппұл немесе бас бостандығынан айыру)", "Тек ауызша ескерту", "Ештеңе қаралмаған", "Тек әкімшілік сөгіс"],
        correct: 0,
        explanation: "Пара беру де, пара алу да ауыр қылмыстық жауапкершілікке әкеледі."
      },
      {
        question: "«Заң үстемдігі» (Rule of Law) қағидасы нені білдіреді?",
        answers: ["Заңның барлық азаматтар мен лауазымды тұлғаларға бірдей тең қолданылуы", "Тек бай адамдардың заңға бағынуы", "Заңды күнде өзгерту", "Шенеуніктердің заңнан жоғары болуы"],
        correct: 0,
        explanation: "Заң үстемдігі бойынша ешкім де заңнан жоғары тұра алмайды."
      },
      {
        question: "Сыбайлас жемқорлық фактісі туралы хабарлаған азаматқа мемлекеттен қандай қолдау бар?",
        answers: ["Құпиялылықты қорғау және заңды түрде ақшалай сыйақы беру", "Ештеңе қарастырылмаған", "Тек мақтау қағазы", "Жұмыстан босату"],
        correct: 0,
        explanation: "Мемлекет жемқорлықты хабарлаған азаматтарды қорғайды және қаржылай ынталандырады."
      },
      {
        question: "Сот жүйесіндегі АБТ (Аудио-бейне тіркеу) жүйесі не үшін қажет?",
        answers: ["Сот отырысының өтуін толық тіркеп, парақорлық пен заңсыздыққа жол бермеу үшін", "Судьяларға кино түсіру үшін", "Сот процесін тездету үшін", "Сотты жабу үшін"],
        correct: 0,
        explanation: "АБТ барлық сөйлеген сөздерді жазып, бұрмалауға мүмкіндік бермейді."
      },
      {
        question: "Құқықтық сауаттылықты арттырудың ең басты пайдасы қандай?",
        answers: ["Өз құқықтарыңды біліп, заңсыз талаптардан өзіңді және қоғамды қорғау", "Заңды айналып өтуді үйрену", "Тек соттасу", "Айыппұлдардан қашу"],
        correct: 0,
        explanation: "Құқықтық сауатты азамат өзін заңсыздық пен жемқорлықтан қорғай алады."
      }
    ]
  }
];

export default function App() {
  // Game persistent state in localStorage
  const [playerData, setPlayerData] = useState(() => {
    const saved = localStorage.getItem('corruption_off_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
    return {
      points: 0,
      completedZones: [], // Array of zone IDs e.g. [1, 2]
      achievements: [], // Array of achievement IDs e.g. ["first_step"]
      sound: true,
      freeMode: false
    };
  });

  // UI state variables
  const [activeTab, setActiveTab] = useState('map'); // 'map', 'knowledge', 'achievements', 'stats', 'about'
  const [selectedZone, setSelectedZone] = useState(null);
  const [zoneStage, setZoneStage] = useState('intro'); // 'intro', 'scenario', 'risk', 'detective', 'quiz', 'completed'

  // Stage specific state
  const [scenarioAnswer, setScenarioAnswer] = useState(null);
  const [riskAnswer, setRiskAnswer] = useState(null);
  const [detectiveSelected, setDetectiveSelected] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Modals state
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('corruption_off_data', JSON.stringify(playerData));
  }, [playerData]);

  // Toast Notification Helper
  const triggerNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Computed player current rank
  const currentRank = useMemo(() => {
    let rank = RANKS[0];
    for (let r of RANKS) {
      if (playerData.points >= r.threshold) {
        rank = r;
      }
    }
    return rank;
  }, [playerData.points]);

  // Computed city progress percentage
  const cityProgress = useMemo(() => {
    return Math.round((playerData.completedZones.length / ZONES_DATA.length) * 100);
  }, [playerData.completedZones]);

  // Check achievements unlock triggers
  const checkAndGrantAchievements = (newPoints, completedZonesArr, lastRiskDone = false) => {
    let newBadges = [...playerData.achievements];

    if (newPoints > 0 && !newBadges.includes("first_step")) {
      newBadges.push("first_step");
      triggerNotification("Жетістік ашылды: «Адал таңдау»! 🎯");
    }

    if (lastRiskDone && !newBadges.includes("risk_detective")) {
      newBadges.push("risk_detective");
      triggerNotification("Жетістік ашылды: «Тәуекел детективі»! 🔎");
    }

    if (completedZonesArr.length >= 3 && !newBadges.includes("transparency_ambassador")) {
      newBadges.push("transparency_ambassador");
      triggerNotification("Жетістік ашылды: «Ашықтық елшісі»! 🌟");
    }

    if (completedZonesArr.length === 5 && !newBadges.includes("justice_defender")) {
      newBadges.push("justice_defender");
      triggerNotification("Жетістік ашылды: «Әділдік қорғаушысы»! 🛡️");
    }

    if (completedZonesArr.length === 5 && !newBadges.includes("city_architect")) {
      newBadges.push("city_architect");
      triggerNotification("ҰЛЫ ЖЕТІСТІК: «Қаланың сәулетшісі»! 🏛️");
      setShowVictoryModal(true);
    }

    setPlayerData(prev => ({ ...prev, achievements: newBadges }));
  };

  const handleOpenZone = (zone) => {
    // Check lock status
    const isCompleted = playerData.completedZones.includes(zone.id);
    const isUnlocked = playerData.freeMode || zone.id === 1 || playerData.completedZones.includes(zone.id - 1) || isCompleted;

    if (!isUnlocked) {
      triggerNotification("Бұл аймақ әлі жабық! Алдымен алдыңғы аймақты қалпына келтіріңіз.", "warning");
      return;
    }

    setSelectedZone(zone);
    setZoneStage('intro');
    setScenarioAnswer(null);
    setRiskAnswer(null);
    setDetectiveSelected([]);
    setQuizIndex(0);
    setQuizAnswers([]);
    setQuizSubmitted(false);
  };

  // Scenario 1 submit
  const handleScenarioSubmit = (option) => {
    if (scenarioAnswer) return; // already answered
    setScenarioAnswer(option);

    if (option.isCorrect) {
      const addedPoints = 10;
      const updatedPts = playerData.points + addedPoints;
      setPlayerData(prev => ({ ...prev, points: updatedPts }));
      triggerNotification(`Дұрыс жауап! +${addedPoints} ұпай жинадыңыз!`, "success");
      checkAndGrantAchievements(updatedPts, playerData.completedZones);
    } else {
      triggerNotification("Қате жауап! Түсіндірмені мұқият оқып шығыңыз.", "error");
    }
  };

  // Risk task submit
  const handleRiskSubmit = (option) => {
    if (riskAnswer) return;
    setRiskAnswer(option);

    if (option.isCorrect) {
      const addedPoints = 15;
      const updatedPts = playerData.points + addedPoints;
      setPlayerData(prev => ({ ...prev, points: updatedPts }));
      triggerNotification(`Тәуекел анықталды! +${addedPoints} ұпай!`, "success");
      checkAndGrantAchievements(updatedPts, playerData.completedZones, true);
    } else {
      triggerNotification("Қате таңдау! Оқиға картасын қайта зерттеңіз.", "error");
    }
  };

  // Detective task toggle
  const handleDetectiveToggle = (item) => {
    if (detectiveSelected.includes(item.id)) {
      setDetectiveSelected(detectiveSelected.filter(id => id !== item.id));
    } else {
      if (detectiveSelected.length < 3) {
        setDetectiveSelected([...detectiveSelected, item.id]);
      } else {
        triggerNotification("Тек 3 дұрыс ережені таңдай аласыз!", "warning");
      }
    }
  };

  const handleDetectiveCheck = () => {
    const correctItems = selectedZone.detectiveTask.items.filter(i => i.isCorrect).map(i => i.id);
    const isAllCorrect = detectiveSelected.length === 3 && detectiveSelected.every(id => correctItems.includes(id));

    if (isAllCorrect) {
      const addedPoints = 20;
      const updatedPts = playerData.points + addedPoints;
      setPlayerData(prev => ({ ...prev, points: updatedPts }));
      triggerNotification(`Зерттеу 100% аяқталды! +${addedPoints} ұпай!`, "success");
      setZoneStage('quiz');
    } else {
      triggerNotification("Кейбір таңдаулар қате немесе толық емес. Қайта тексеріңіз!", "error");
    }
  };

  // Quiz answer select
  const handleQuizAnswer = (ansIdx) => {
    const newAns = [...quizAnswers];
    newAns[quizIndex] = ansIdx;
    setQuizAnswers(newAns);
  };

  const handleQuizNext = () => {
    if (quizIndex < selectedZone.quiz.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      // Calculate quiz score
      let correctCount = 0;
      selectedZone.quiz.forEach((q, idx) => {
        if (quizAnswers[idx] === q.correct) correctCount++;
      });

      const bonusPoints = correctCount * 6 + 30; // 30 bonus for finishing
      const newPoints = playerData.points + bonusPoints;
      const newCompleted = Array.from(new Set([...playerData.completedZones, selectedZone.id]));

      setPlayerData(prev => ({
        ...prev,
        points: newPoints,
        completedZones: newCompleted
      }));

      setQuizSubmitted(true);
      setZoneStage('completed');
      triggerNotification(`Тест аяқталды! +${bonusPoints} ұпай косылды. Аймақ қалпына келді!`, "success");
      checkAndGrantAchievements(newPoints, newCompleted);
    }
  };

  // Reset progress handler
  const handleResetGame = () => {
    setPlayerData({
      points: 0,
      completedZones: [],
      achievements: [],
      sound: true,
      freeMode: false
    });
    setShowResetConfirmModal(false);
    setSelectedZone(null);
    triggerNotification("Ойын прогресі толығымен қайта басталды!", "info");
  };

  const renderCityMap = () => {
    return (
      <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-700/80 shadow-2xl p-4 md:p-6 my-4 transition-all">
        {/* Map Header Overlay */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
              <span className="text-emerald-400">«CORRUPTION: OFF»</span> Интерактивті Картасы
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Тапсырмаларды орындап, сұр қаланы сәулетті әрі жарқын еліміздің орталығына айналдырыңыз!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPlayerData(p => ({ ...p, freeMode: !p.freeMode }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                playerData.freeMode 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {playerData.freeMode ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              {playerData.freeMode ? "Еркін режим: АҚТҮРЛІ" : "Еркін режимді қосу"}
            </button>

            <button
              onClick={() => setShowRulesModal(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/50 flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Eрежелер
            </button>
          </div>
        </div>

        {/* Dynamic 2.5D Vector Map Canvas */}
        <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner group">
          {/* Background Grid & City Lights */}
          <svg className="w-full h-full absolute inset-0 select-none" viewBox="0 0 800 800">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
              {/* Zone Gradients for Restored State */}
              <linearGradient id="grad-edu" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="grad-health" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#064E3B" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="grad-public" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="grad-employ" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#78350F" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="grad-justice" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#831843" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Grid Pattern */}
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Connecting Roads */}
            <path d="M 260 220 L 550 180 L 580 400 L 410 620 L 300 430 Z" fill="none" stroke="#334155" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 260 220 L 550 180 L 580 400 L 410 620 L 300 430 Z" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="6 6" />

            {/* Render 5 Zones SVG Shapes */}
            {ZONES_DATA.map((zone) => {
              const isCompleted = playerData.completedZones.includes(zone.id);
              const isUnlocked = playerData.freeMode || zone.id === 1 || playerData.completedZones.includes(zone.id - 1) || isCompleted;

              let fillStyle = "#1E293B"; // Gray default
              let strokeStyle = "#475569";

              if (isCompleted) {
                if (zone.id === 1) fillStyle = "url(#grad-edu)";
                if (zone.id === 2) fillStyle = "url(#grad-health)";
                if (zone.id === 3) fillStyle = "url(#grad-public)";
                if (zone.id === 4) fillStyle = "url(#grad-employ)";
                if (zone.id === 5) fillStyle = "url(#grad-justice)";
                strokeStyle = zone.color;
              } else if (isUnlocked) {
                fillStyle = "#334155";
                strokeStyle = "#94A3B8";
              }

              return (
                <g key={zone.id} className="transition-all duration-500 cursor-pointer" onClick={() => handleOpenZone(zone)}>
                  {/* Outer Glow when restored */}
                  {isCompleted && (
                    <path
                      d={zone.pathSvg}
                      fill={zone.color}
                      opacity="0.25"
                      className="animate-pulse"
                    />
                  )}

                  {/* Base Zone Shape */}
                  <path
                    d={zone.pathSvg}
                    fill={fillStyle}
                    stroke={strokeStyle}
                    strokeWidth={isUnlocked ? "3" : "1.5"}
                    className="hover:opacity-90 transition-opacity"
                  />

                  {/* Restored City Decorations (Trees, Sunbeams, Glows) */}
                  {isCompleted && (
                    <g>
                      <circle cx={zone.centerPos.x - 20} cy={zone.centerPos.y - 30} r="6" fill="#4ADE80" opacity="0.8" />
                      <circle cx={zone.centerPos.x + 30} cy={zone.centerPos.y + 20} r="8" fill="#38BDF8" opacity="0.8" />
                      <circle cx={zone.centerPos.x - 35} cy={zone.centerPos.y + 25} r="5" fill="#FACC15" opacity="0.8" />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* District Interactive Node Markers Overlay */}
          {ZONES_DATA.map((zone) => {
            const isCompleted = playerData.completedZones.includes(zone.id);
            const isUnlocked = playerData.freeMode || zone.id === 1 || playerData.completedZones.includes(zone.id - 1) || isCompleted;
            const ZoneIcon = zone.icon;

            return (
              <div
                key={zone.id}
                style={{
                  left: `${(zone.centerPos.x / 800) * 100}%`,
                  top: `${(zone.centerPos.y / 800) * 100}%`
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-300 hover:scale-110"
              >
                <button
                  onClick={() => handleOpenZone(zone)}
                  className={`relative flex flex-col items-center group/btn focus:outline-none`}
                >
                  {/* Status Badge Ring */}
                  <div
                    className={`p-3 md:p-4 rounded-2xl shadow-xl border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-700 border-white text-white shadow-emerald-500/50 animate-bounce'
                        : isUnlocked
                        ? 'bg-slate-800 border-slate-300 text-white shadow-slate-900 ring-2 ring-indigo-500/50'
                        : 'bg-slate-900/90 border-slate-700 text-slate-500 opacity-70 grayscale'
                    }`}
                  >
                    <ZoneIcon className="w-6 h-6 md:w-8 md:h-8" />

                    {/* Completion Checkmark Badge */}
                    {isCompleted && (
                      <span className="absolute -top-2 -right-2 bg-emerald-400 text-slate-950 p-1 rounded-full shadow-md">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}

                    {!isUnlocked && (
                      <span className="absolute -top-2 -right-2 bg-slate-800 text-slate-400 p-1 rounded-full border border-slate-600">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Tooltip Label */}
                  <div className="mt-2 bg-slate-900/95 border border-slate-700 text-white px-3 py-1 rounded-xl shadow-lg text-center whitespace-nowrap">
                    <p className="text-xs font-extrabold flex items-center gap-1 justify-center">
                      {zone.title}
                    </p>
                    <span className={`text-[10px] font-medium block ${
                      isCompleted ? 'text-emerald-400' : isUnlocked ? 'text-indigo-300' : 'text-slate-400'
                    }`}>
                      {isCompleted ? "Қалпына келтірілді ✨" : isUnlocked ? "Қолжетімді 🔓" : "Жабық 🔒"}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* District Quick Selection Footer */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
          {ZONES_DATA.map((z) => {
            const isCompleted = playerData.completedZones.includes(z.id);
            const isUnlocked = playerData.freeMode || z.id === 1 || playerData.completedZones.includes(z.id - 1) || isCompleted;

            return (
              <button
                key={z.id}
                onClick={() => handleOpenZone(z)}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                  isCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 hover:bg-emerald-900/50'
                    : isUnlocked
                    ? 'bg-slate-800/80 border-slate-600 text-slate-200 hover:bg-slate-700'
                    : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div className={`p-2 rounded-xl text-white ${
                  isCompleted ? 'bg-emerald-600' : isUnlocked ? 'bg-indigo-600' : 'bg-slate-700'
                }`}>
                  <z.icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold truncate">{z.title}</p>
                  <p className="text-[10px] opacity-80">{isCompleted ? "100% Аяқталды" : isUnlocked ? "Бастау" : "Кезекті күтуде"}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderZoneGameModal = () => {
    if (!selectedZone) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-lg overflow-y-auto animate-fadeIn">
        <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto">
          {/* Zone Modal Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-800 bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300">
                <selectedZone.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-white">{selectedZone.title}</h3>
                <p className="text-xs text-slate-400">{selectedZone.subtitle}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedZone(null)}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              ✕
            </button>
          </div>

          {/* Game Progression Bar inside Zone */}
          <div className="w-full bg-slate-800 h-1.5 flex">
            <div className={`h-full transition-all duration-300 ${zoneStage === 'intro' ? 'w-1/5 bg-indigo-500' : zoneStage === 'scenario' ? 'w-2/5 bg-indigo-500' : zoneStage === 'risk' ? 'w-3/5 bg-indigo-500' : zoneStage === 'detective' ? 'w-4/5 bg-indigo-500' : 'w-full bg-emerald-500'}`} />
          </div>

          {/* Modal Stage Content */}
          <div className="p-4 md:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* STAGE 0: Intro Characters Dialogue */}
            {zoneStage === 'intro' && (
              <div className="space-y-6">
                <div className="bg-indigo-950/40 border border-indigo-800/50 p-4 rounded-2xl">
                  <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-1">
                    Кейіпкерлермен Танысу
                  </h4>
                  <p className="text-xs text-slate-300">
                    Бұл аймақтағы мәселелерді шешу үшін кейіпкерлердің оқиғасын мұқият оқып шығыңыз.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {selectedZone.characters.map((char, i) => (
                    <div key={i} className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex flex-col justify-between hover:border-slate-600 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl p-2 bg-slate-900 rounded-2xl border border-slate-700">{char.avatar}</span>
                        <div>
                          <h5 className="font-bold text-white text-base">{char.name}</h5>
                          <p className="text-xs text-emerald-400 font-medium">{char.role}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        "{char.dialogue}"
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setZoneStage('scenario')}
                    className="px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all"
                  >
                    Тапсырмаларды Бастау <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 1: Scenario Decision */}
            {zoneStage === 'scenario' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    1-кезең: Шешімді таңда
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Сыйақы: +10 ұпай</span>
                </div>

                <div className="bg-slate-800/90 border border-slate-700 p-4 md:p-5 rounded-2xl">
                  <h4 className="text-base font-bold text-white mb-2">{selectedZone.scenario.title}</h4>
                  <p className="text-sm text-slate-200 leading-relaxed">{selectedZone.scenario.description}</p>
                </div>

                <div className="space-y-3">
                  {selectedZone.scenario.options.map((opt) => {
                    const isSelected = scenarioAnswer?.id === opt.id;
                    let btnClass = "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750";

                    if (scenarioAnswer) {
                      if (opt.isCorrect) {
                        btnClass = "bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50";
                      } else if (isSelected && !opt.isCorrect) {
                        btnClass = "bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/50";
                      } else {
                        btnClass = "bg-slate-900 border-slate-800 text-slate-500 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleScenarioSubmit(opt)}
                        disabled={!!scenarioAnswer}
                        className={`w-full p-4 rounded-2xl border text-left text-xs md:text-sm font-medium transition-all flex items-start gap-3 ${btnClass}`}
                      >
                        <span className="p-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold uppercase mt-0.5">
                          {opt.id}
                        </span>
                        <div className="flex-1">
                          <p>{opt.text}</p>
                          {scenarioAnswer && isSelected && (
                            <p className={`mt-2 text-xs p-2 rounded-xl border ${
                              opt.isCorrect ? 'bg-emerald-900/50 border-emerald-700 text-emerald-300' : 'bg-rose-900/50 border-rose-700 text-rose-300'
                            }`}>
                              💡 {opt.explanation}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {scenarioAnswer && (
                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => setZoneStage('risk')}
                      className="px-6 py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 transition-all shadow-lg"
                    >
                      Келесі Тапсырма (Тәуекелді анықтау) <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 2: Risk Card Identification */}
            {zoneStage === 'risk' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    2-кезең: Жемқорлық тәуекелін анықта
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Сыйақы: +15 ұпай</span>
                </div>

                {/* Visual Official Card */}
                <div className="bg-gradient-to-br from-amber-950/40 to-slate-900 border-2 border-amber-500/40 p-5 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-2">
                    <AlertTriangle className="w-4 h-4" /> Құжат / Жағдаят Карточкасы
                  </div>
                  <pre className="text-xs md:text-sm text-slate-200 font-mono whitespace-pre-wrap leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                    {selectedZone.riskTask.cardText}
                  </pre>
                </div>

                <p className="text-sm font-bold text-white">{selectedZone.riskTask.question}</p>

                <div className="space-y-3">
                  {selectedZone.riskTask.options.map((opt) => {
                    const isSelected = riskAnswer?.id === opt.id;
                    let btnStyle = "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750";

                    if (riskAnswer) {
                      if (opt.isCorrect) {
                        btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/50";
                      } else {
                        btnStyle = "bg-slate-900 border-slate-800 text-slate-500 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleRiskSubmit(opt)}
                        disabled={!!riskAnswer}
                        className={`w-full p-4 rounded-2xl border text-left text-xs md:text-sm font-medium transition-all ${btnStyle}`}
                      >
                        <p>{opt.text}</p>
                        {riskAnswer && isSelected && (
                          <p className={`mt-2 text-xs p-2 rounded-xl border ${
                            opt.isCorrect ? 'bg-emerald-900/50 border-emerald-700 text-emerald-300' : 'bg-rose-900/50 border-rose-700 text-rose-300'
                          }`}>
                            🔍 {opt.explanation}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>

                {riskAnswer && (
                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => setZoneStage('detective')}
                      className="px-6 py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 transition-all shadow-lg"
                    >
                      Келесі Тапсырма (Ашықтық детективі) <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 3: Transparency Detective */}
            {zoneStage === 'detective' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    3-кезең: Ашықтық детективі
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Таңдалды: {detectiveSelected.length} / 3</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <p className="text-xs md:text-sm text-slate-200 font-medium">
                    {selectedZone.detectiveTask.instruction}
                  </p>
                  {/* Investigation Progress Bar */}
                  <div className="mt-3 w-full bg-slate-900 rounded-full h-3 p-0.5 border border-slate-700">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(detectiveSelected.length / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  {selectedZone.detectiveTask.items.map((item) => {
                    const isChecked = detectiveSelected.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleDetectiveToggle(item)}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs md:text-sm font-medium transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-cyan-950/50 border-cyan-500 text-cyan-200 shadow-md ring-1 ring-cyan-500/50'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                        }`}
                      >
                        <span className="pr-2">{item.text}</span>
                        <div className={`p-1.5 rounded-xl border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 border-slate-700 text-transparent'
                        }`}>
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    onClick={handleDetectiveCheck}
                    disabled={detectiveSelected.length !== 3}
                    className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
                      detectiveSelected.length === 3
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/25'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    Зерттеуді Тексеру <ShieldCheck className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 4: Final Quiz */}
            {zoneStage === 'quiz' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Қорытынды Тест: {quizIndex + 1} / {selectedZone.quiz.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Сыйақы: +30 ұпай + Бонус</span>
                </div>

                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <h4 className="text-sm md:text-base font-bold text-white leading-relaxed">
                    {selectedZone.quiz[quizIndex].question}
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {selectedZone.quiz[quizIndex].answers.map((ans, aIdx) => {
                    const isSelected = quizAnswers[quizIndex] === aIdx;

                    return (
                      <button
                        key={aIdx}
                        onClick={() => handleQuizAnswer(aIdx)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs md:text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                        }`}
                      >
                        {ans}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    onClick={handleQuizNext}
                    disabled={quizAnswers[quizIndex] === undefined}
                    className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
                      quizAnswers[quizIndex] !== undefined
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    {quizIndex < selectedZone.quiz.length - 1 ? "Келесі Сұрақ" : "Тестті Аяқтау & Аймақты Қалпына Келтіру"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 5: Zone Completed & Restored */}
            {zoneStage === 'completed' && (
              <div className="text-center py-6 space-y-5 animate-scaleUp">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30 animate-bounce">
                  <Sparkles className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-black text-white">
                  Аймақ Сәтті Қалпына Келтірілді! 🎉
                </h3>

                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Сіз <strong className="text-emerald-400">{selectedZone.title}</strong> тапсырмаларын толық аяқтап, қаламыздың дамуына үлкен үлес қостыңыз!
                </p>

                <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl max-w-sm mx-auto flex items-center justify-around text-center">
                  <div>
                    <span className="text-xs text-slate-400 block">Жинаған ұпай</span>
                    <span className="text-lg font-black text-emerald-400">+{selectedZone.quiz.length * 6 + 30}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-700" />
                  <div>
                    <span className="text-xs text-slate-400 block">Аймақ мәртебесі</span>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-700">
                      Жарқын & Ашық
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSelectedZone(null)}
                    className="px-8 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/25 transition-all"
                  >
                    Қала Картасына Оралу 🏙️
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderKnowledgeHub = () => (
    <div className="max-w-4xl mx-auto space-y-6 my-6 p-4">
      <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-indigo-500/40 p-6 rounded-3xl backdrop-blur-md shadow-xl">
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-indigo-400" /> Білім Орталығы: Сыбайлас Жемқорлыққа Қарсы Мәдениет
        </h2>
        <p className="text-sm text-slate-200 mt-2 leading-relaxed">
          Құқықтық сауаттылықты арттыру, адалдық пен ашықтық принципін күнделікті өмірде қолдану жөніндегі маңызды ақпараттар мен заңнамалық негіздер.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-slate-700 transition-all">
          <div className="p-2 bg-blue-500/20 text-blue-400 w-fit rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">1. Сыбайлас жемқорлықтың мәні</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Сыбайлас жемқорлық — бұл лауазымды адамдардың өз өкілеттіктерін жеке пайдасы немесе басқа адамдардың мүддесі үшін заңсыз пайдалануы. Ол қоғамның дамуын баяулатады.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-slate-700 transition-all">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 w-fit rounded-xl">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">2. Ашықтық пен Цифрландыру</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Мемлекеттік қызметтерді электронды форматқа көшіру шенеунік пен азамат арасындағы тікелей байланысты жояды, бұл жемқорлық тәуекелін едәуір азайтады.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-slate-700 transition-all">
          <div className="p-2 bg-amber-500/20 text-amber-400 w-fit rounded-xl">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">3. Мүдделер қақтығысы</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Мемлекеттік немесе корпоративтік қызметте жеке қызығушылық пен ресми міндеттер түйіскенде туындайды. Лауазымды тұлға мұндай жағдаятты алдын ала хабарлауға міндетті.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-slate-700 transition-all">
          <div className="p-2 bg-pink-500/20 text-pink-400 w-fit rounded-xl">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">4. 1424 Бipыңғай Колл-Орталығы</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Кез келген жемқорлық фактісі немесе заңсыз талаптар бойынша 1424 тегін байланыс нөміріне хабарласуға болады. Мемлекет ақпарат берген азаматты қорғайды.
          </p>
        </div>
      </div>
    </div>
  );

  const renderAchievementsTab = () => (
    <div className="max-w-4xl mx-auto space-y-6 my-6 p-4">
      {/* Player Status Overview */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="text-5xl p-4 bg-slate-800 rounded-3xl border border-slate-700">
            {currentRank.icon}
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Ағымдағы Деңгей</span>
            <h2 className="text-2xl font-black text-white">{currentRank.title}</h2>
            <p className="text-xs text-slate-400 mt-1">Жинаған жалпы ұпай: <strong className="text-emerald-400">{playerData.points} XP</strong></p>
          </div>
        </div>

        <button
          onClick={() => setShowResetConfirmModal(true)}
          className="px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 text-xs font-bold flex items-center gap-2 transition-all shrink-0"
        >
          <RefreshCw className="w-4 h-4" /> Прогресті қайта бастау
        </button>
      </div>

      {/* Badges List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> Медальдар мен Жетістіктер
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ALL_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = playerData.achievements.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-slate-900 border-amber-500/50 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/50 border-slate-800 opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl p-2.5 bg-slate-800 rounded-2xl border border-slate-700 shrink-0">
                  {ach.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {ach.title}
                    {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="max-w-4xl mx-auto space-y-6 my-6 p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" /> Ортақ Виртуалды Қала Статистикасы
          </h2>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Демо Режим
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Бұл бөлімде ортақ виртуалды қаланың жиынтық индикаторлары көрсетілген. Барлық белсенді азаматтардың үлесі қала дамуының жалпы көрсеткішін қалыптастырады.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs text-slate-400 block">Жалпы Ұпай</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">12,480 XP</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs text-slate-400 block">Тапсырмалар</span>
            <span className="text-2xl font-black text-cyan-400 mt-1 block">1,842</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs text-slate-400 block">Қалпына Аймақтар</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">84%</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs text-slate-400 block">Азаматтық Индекс</span>
            <span className="text-2xl font-black text-indigo-400 mt-1 block">9.6 / 10</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 pb-12">
      {/* Toast Notification Alert */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border text-xs md:text-sm font-bold flex items-center gap-2.5 animate-bounce ${
          notification.type === 'success'
            ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
            : notification.type === 'warning'
            ? 'bg-amber-950 border-amber-500 text-amber-200'
            : 'bg-rose-950 border-rose-500 text-rose-200'
        }`}>
          <Sparkles className="w-4 h-4 shrink-0" />
          {notification.msg}
        </div>
      )}

      {/* Main Game Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 md:px-8 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-2xl shadow-lg shadow-emerald-500/20 text-slate-950 font-black">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black tracking-wider text-white flex items-center gap-2">
                CORRUPTION: <span className="text-emerald-400">OFF</span>
              </h1>
              <p className="text-[11px] font-medium text-slate-400">«Әділ қаланы бірге құрамыз!»</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-2 rounded-2xl border border-slate-800 text-xs">
            <div className="px-3 py-1 flex items-center gap-2 border-r border-slate-800">
              <span className="text-base">{currentRank.icon}</span>
              <div>
                <span className="text-[10px] text-slate-400 block">ДӘРЕЖЕ</span>
                <span className="font-bold text-white">{currentRank.title}</span>
              </div>
            </div>

            <div className="px-3 py-1 flex items-center gap-2 border-r border-slate-800">
              <Flame className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 block">ҰПАЙ</span>
                <span className="font-bold text-amber-400">{playerData.points} XP</span>
              </div>
            </div>

            <div className="px-3 py-1 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-400 block">ҚАЛА ДАМУЫ</span>
                <span className="font-bold text-emerald-400">{cityProgress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto mt-3 flex items-center justify-center sm:justify-start gap-1 overflow-x-auto border-t border-slate-800/80 pt-2">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'map' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" /> Қала Картасы
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'knowledge' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Білім Орталығы
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'achievements' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" /> Жетістіктерім
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'stats' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Қала Статистикасы
          </button>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="px-4">
        {activeTab === 'map' && renderCityMap()}
        {activeTab === 'knowledge' && renderKnowledgeHub()}
        {activeTab === 'achievements' && renderAchievementsTab()}
        {activeTab === 'stats' && renderStatsTab()}
      </main>

      {/* Render Active Zone Game Modal */}
      {renderZoneGameModal()}

      {/* Victory Celebration Modal */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-6 md:p-8 max-w-lg w-full text-center space-y-6 shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/50 animate-bounce">
              <Trophy className="w-12 h-12 text-slate-950" />
            </div>

            <h2 className="text-3xl font-black text-white">ҚҰТТЫҚТАЙМЫЗ! 🏆</h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Сіз бес аймақты да сәтті қалпына келтіріп, әділдік пен ашықтыққа негізделген заманауи <strong className="text-emerald-400">«CORRUPTION: OFF»</strong> қаласын толығымен тұрғыздыңыз!
            </p>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-left space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Жалпы ұпай:</span> <strong className="text-emerald-400">{playerData.points} XP</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Алынған атақ:</span> <strong className="text-amber-400">Әділ қала сәулетшісі 👑</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Қалпына келтірілген аймақтар:</span> <strong className="text-white">5 / 5 (100%)</strong>
              </div>
            </div>

            <button
              onClick={() => setShowVictoryModal(false)}
              className="w-full py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all"
            >
              Қаланы Қайта Зерттеу 🏙️
            </button>
          </div>
        </div>
      )}

      {/* Rules Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" /> Ойын Ережесі
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
              <li>Қалада 5 негізгі аймақ бар. Оларды ретімен немесе еркін режимде қалпына келтіруге болады.</li>
              <li>Әр аймақта кейіпкерлердің диалогтары, шешім қабылдау, жемқорлық тәуекелін анықтау және тест тапсырмалары бар.</li>
              <li>Дұрыс орындалған тапсырмалар үшін ұпайлар мен медальдар беріледі.</li>
              <li>Аймақ аяқталғанда қаланың ғимараттары жаңарып, жарқын түске боялады.</li>
            </ul>
            <button
              onClick={() => setShowRulesModal(false)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-all"
            >
              Түсінікті
            </button>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-white">Ойынды қайта бастағыңыз келе ме?</h3>
            <p className="text-xs text-slate-400">
              Барлық жинаған ұпайларыңыз бен ашылған аймақтарыңыз өшіріледі!
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
              >
                Бас тарту
              </button>
              <button
                onClick={handleResetGame}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500"
              >
                Иә, қайта бастау
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}