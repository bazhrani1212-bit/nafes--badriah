/*
 * ملف جافاسكريبت يدير عرض الأسئلة وتسجيل النتائج.
 * يعتمد على بنية بيانات للأسئلة تحاكي نماذج نافس.
 * كما يحتوي على وظائف لإرسال البيانات إلى Google Sheets عبر Web App.
 */

// مصفوفة الأسئلة لكل اختبار. كل عنصر يحتوي على عنوان الاختبار ومصفوفة من الأسئلة.
// تم إدراج الأسئلة الواردة في المذكرة «نافِس علوم سادس – نسخة الطالبة» (الاختبارات 1‑5).
const tests = [
  {
    title: "الاختبار التجريبي (1)",
    questions: [
      {
        text: "الوحدات البنائية الأساسية في المخلوقات الحية جميعها هي ...؟",
        options: ["المركبات", "العناصر", "الخلايا", "الذرات"],
        correct: 2,
        hint: "الخلايا هي الوحدة البنائية والوظيفية لجميع الكائنات الحية."
      },
      {
        text: "بين الغشاء البلازمي والنواة في الخلية يوجد مادة تشبه الهلام تسمى:",
        options: ["الجدار الخلوي", "الغشاء الخلوي", "الكروموسوم", "السيتوبلازم"],
        correct: 3,
        hint: "السيتوبلازم هو السائل الذي يملأ الخلية ويحتوي على العضيات."
      },
      {
        text: "أي التراكيب التالية يمكن كتابته لتكتمل بيانات الخلية؟",
        options: ["السيتوبلازم", "الفجوة", "الميتوكوندريا", "البلاستيدات الخضراء"],
        correct: 2,
        hint: "الميتوكوندريا مسؤولة عن إنتاج الطاقة في الخلية."
      },
      {
        text: "أي أجزاء النبات يحافظ على قوامه ويبقيه قائماً؟",
        options: ["الجذور", "الساق", "الأوراق", "الأزهار"],
        correct: 1,
        hint: "تدعم الساق النبات وتنقل الماء والغذاء بين الأجزاء المختلفة."
      },
      {
        text: "في أي جزء من الخلية يتم هضم الفضلات والعضيات التالفة بواسطة الإنزيمات؟",
        options: ["الفجوات", "الشبكة الإندوبلازمية", "النواة", "الأجسام المحللة"],
        correct: 3,
        hint: "الأجسام المحللة تحتوي على إنزيمات للهضم داخل الخلية."
      },
      {
        text: "أي أجزاء الخلية التالية وظيفته صحيحة؟",
        options: [
          "النواة تخزن المياه والغذاء والفضلات",
          "السيتوبلازم يحمي المادة الوراثية",
          "الميتوكوندريا تمتص الطاقة الضوئية",
          "الفجوات تخزن المعلومات الوراثية"
        ],
        correct: 1,
        hint: "السيتوبلازم يحيط بالعضيات ويوفر الحماية للمواد الوراثية لكنه لا يخزنها."
      },
      {
        text: "طبقة صلبة تحيط بالغشاء البلازمي في الخلية النباتية وتحميها وتدعمها هي:",
        options: ["الجدار الخلوي", "البلاستيدات الخضراء", "الكلوروفيل", "الغشاء النووي"],
        correct: 0,
        hint: "الجدار الخلوي هو المسؤول عن الدعم والحماية في الخلايا النباتية."
      },
      {
        text: "أي من الكائنات الحية التالية يعتبر وحيد الخلية؟",
        options: ["الأرنب", "الدولفين", "نخيل", "فطر الخميرة"],
        correct: 3,
        hint: "الخميرة هي فطر أحادي الخلية يستخدم في صناعة الخبز."
      }
    ]
  },
  {
    title: "الاختبار التجريبي (2)",
    questions: [
      {
        text: "حدد اسم التركيب المشار إليه بالسهم في الخلية النباتية:",
        options: ["الميتوكوندريا", "الرايبوسومات", "العصارية الفجوية", "البلاستيدات الخضراء"],
        correct: 2,
        hint: "العصارية الفجوية هي حجرة كبيرة تُخزن فيها الماء والفضلات في الخلية النباتية."
      },
      {
        text: "في الشكل التالي نوع النقل السلبي هو ...؟",
        options: ["النقل النشط", "التنفس الخلوي", "الانتشار", "البلعمة"],
        correct: 2,
        hint: "الانتشار هو انتقال الجزيئات من منطقة تركيز عالٍ إلى تركيز منخفض دون طاقة."
      },
      {
        text: "الجزء الموضح بالرسم يمثل في الخلية النباتية:",
        options: ["البلاستيدات الخضراء", "جدار الخلية", "السيتوبلازم", "النواة"],
        correct: 1,
        hint: "جدار الخلية يعطي الخلية النباتية شكلها ويدعمها."
      },
      {
        text: "الخلية الموضحة بالرسم المجاور هي خلية ...؟",
        options: ["حيوانية", "نباتية", "فطريات", "بكتيريا"],
        correct: 1,
        hint: "وجود جدار خلوي وفجوة عصارية كبيرة يعني أنها خلية نباتية."
      },
      {
        text: "أي المواد الآتية سينفذ من خلال الغشاء عبر الخاصية الأسموزية؟",
        options: ["السكر", "النيتروجين", "الأكسجين", "الماء"],
        correct: 3,
        hint: "الأسموزية هي انتقال الماء عبر الغشاء من تركيز منخفض إلى تركيز عالٍ للمذاب."
      },
      {
        text: "حدوث التنفس الخلوي في النباتات والحيوانات يتطلب وجود:",
        options: ["الماء", "الأكسجين", "ثاني أكسيد الكربون", "ضوء الشمس"],
        correct: 1,
        hint: "الأكسجين ضروري لعملية التنفس الخلوي وإنتاج الطاقة."
      },
      {
        text: "ما المادتان الناتجتان عن عملية البناء الضوئي؟",
        options: ["ثاني أكسيد الكربون وسكر الجلوكوز", "الماء وثاني أكسيد الكربون", "الأكسجين والماء", "الجلوكوز والأكسجين"],
        correct: 3,
        hint: "النباتات تنتج الجلوكوز والأكسجين أثناء البناء الضوئي."
      },
      {
        text: "أي العبارات التالية تميز بين الخلية النباتية والخلية الحيوانية؟",
        options: ["للخلية النباتية فجوة كبيرة", "ليس للخلية النباتية نواة", "للخلية الحيوانية جدار خلوي", "للخلية الحيوانية بلاستيدات"],
        correct: 0,
        hint: "تتميز الخلية النباتية بوجود فجوة عصارية كبيرة على عكس الخلية الحيوانية."
      }
    ]
  },
  {
    title: "الاختبار التجريبي (3)",
    questions: [
      {
        text: "ما وظيفة الجهاز التنفسي في الجسم؟",
        options: ["يضخ الدم في كافة أجزاء الجسم", "يأخذ الأكسجين من الهواء ويطلق ثاني أكسيد الكربون", "يحمي الجسم من العدوى", "يتحكم في وظائف الجسم"],
        correct: 1,
        hint: "الجهاز التنفسي مسؤول عن تبادل الغازات اللازمة للحياة."
      },
      {
        text: "الشكل يمثل عضوًا في بطن الإنسان؛ ما الوظيفة الأساسية التي يقوم بها؟",
        options: ["تحليل المواد الغذائية إلى مكوناتها الأساسية", "تفتيت المواد الغذائية وتحويلها إلى سائل كثيف", "امتصاص أغلب المواد الغذائية المتحللة", "تخليص الجسم من المواد السامة"],
        correct: 1,
        hint: "المعدة تقوم بخلط الطعام وتفتيته إلى سائل ليسهل امتصاصه."
      },
      {
        text: "الشكل الماثل أمامك هو عضو في جسم الإنسان يقوم بعملية:",
        options: ["الهضم", "التنفس", "الإحساس", "ضخ الدم"],
        correct: 1,
        hint: "الرئتان مسؤولتان عن عملية التنفس وإدخال الأكسجين إلى الدم."
      },
      {
        text: "يوضح الشكل أدناه تركيب الزهرة، أي الأجزاء التالية من أجزاء الزهرة الذكرية؟",
        options: ["المبيض", "الميسم", "القلم", "المتك"],
        correct: 3,
        hint: "المتك جزء من السداة (العضو الذكري) وهو المسؤول عن إنتاج حبوب اللقاح."
      },
      {
        text: "تابع مرور اللقمة الغذائية عبر الجهاز الهضمي؛ ما العضو المفقود في الرسم؟",
        options: ["المريء", "البلعوم", "المعدة", "الأمعاء الغليظة"],
        correct: 0,
        hint: "اللقمة الغذائية تنتقل من الفم إلى المريء ثم المعدة."
      },
      {
        text: "ما العملية الأولى التي تحصل فيها الحيوانات على الطاقة المختزنة في الغذاء؟",
        options: ["الإخراج", "التنفس", "الدوران", "الهضم"],
        correct: 1,
        hint: "يتم تحرير الطاقة في الخلايا عبر عملية التنفس الخلوي."
      },
      {
        text: "تتحرك العظام في أجسام الحيوانات بسهولة لكنها لا تستطيع التحرك وحدها؛ مصدر القوة هو:",
        options: ["الجهاز العصبي", "الجهاز العضلي", "الجهاز الهضمي", "الجهاز التنفسي"],
        correct: 1,
        hint: "تتصل العضلات بالعظام بواسطة الأوتار وتحركها عند الانقباض."
      },
      {
        text: "يوضح الشكل نباتًا؛ ما وظيفة الجزء المشار إليه؟",
        options: ["امتصاص الماء من التربة", "التكاثر أو جذب الملقحات", "ينقل الماء والغذاء", "يصنع الغذاء للنبتة"],
        correct: 3,
        hint: "الأوراق تحتوي على الكلوروفيل وتقوم بعملية البناء الضوئي لإنتاج الغذاء."
      }
    ]
  },
  {
    title: "الاختبار التجريبي (4)",
    questions: [
      {
        text: "أي من المخلوقات الحية التالية لا ينتمي إلى الحشرات؟",
        options: ["الذبابة", "النحلة", "العقرب", "الفراشة"],
        correct: 2,
        hint: "العقرب من العنكبيات وليست من الحشرات لأنها تملك ثمانية أرجل."
      },
      {
        text: "العفن الذي ينمو على الخبز هو مخلوق حي من:",
        options: ["البدائيات", "الفطريات", "البكتيريا", "الطلائعيات"],
        correct: 1,
        hint: "العفن ينتمي إلى مملكة الفطريات ويتكاثر بالأبواغ."
      },
      {
        text: "أي الفقاريات التالية تستخدم الخياشيم فقط في عملية التنفس؟",
        options: ["الأسماك", "الضفادع", "الزواحف", "الثدييات"],
        correct: 0,
        hint: "الأسماك تتنفس عبر الخياشيم بينما البرمائيات تستخدم الرئتين والجلد بعد تحولها."
      },
      {
        text: "الحلزون والقنفذ ينتميان لمجموعتين مختلفتين؛ ما الصفة المشتركة بينهما؟",
        options: ["ليس لهما عمود فقري", "درجة حرارة ثابتة", "الشعر الكثيف", "وجود قوقعة"],
        correct: 0,
        hint: "كلاهما من اللافقاريات فلا يمتلكان عمودًا فقريًا."
      },
      {
        text: "ما الصفة المشتركة بين مجموعة الحيوانات الموضحة في الشكل؟",
        options: ["يغطيها الريش", "تتكاثر جنسيًا", "يغطيها الشعر", "تتكاثر لا جنسيًا"],
        correct: 0,
        hint: "إذا كانت الصور لطيور؛ فالريش يميز الطيور عن غيرها."
      },
      {
        text: "المخلوق الحي في الشكل يصنف ضمن:",
        options: ["الثدييات", "البرمائيات", "الزواحف", "الحشرات"],
        correct: 0,
        hint: "الثدييات ترضع صغارها وتغطي أجسامها الشعر."
      },
      {
        text: "رتب مراحل دورة حياة الفراشة:",
        options: ["1-3-2-4", "1-4-3-2", "2-3-4-1", "1-2-3-4"],
        correct: 3,
        hint: "تبدأ دورة حياة الفراشة بالبيضة ثم اليرقة ثم العذراء ثم الفراشة البالغة."
      },
      {
        text: "أي مما يلي يكمل الجزء المفقود في دورة حياة نبات الصنوبر؟",
        options: ["بذرة غير مخصبة", "أبواق", "مخاريط أنثوية", "مخاريط ذكرية"],
        correct: 2,
        hint: "تتكون المخاريط الأنثوية لتستقبل حبوب اللقاح وتنتج البذور المخصبة."
      }
    ]
  },
  {
    title: "الاختبار التجريبي (5)",
    questions: [
      {
        text: "أي من النباتات التالية تصنف ضمن النباتات غير الزهرية؟",
        options: ["الليمون", "التفاح", "الصنوبر", "الزيتون"],
        correct: 2,
        hint: "الصنوبر من النباتات المخروطية التي لا تحتوي على أزهار حقيقية."
      },
      {
        text: "أي الأجزاء التالية يوجد داخل ساق النبات؟",
        options: ["البشرة", "الخشب", "الشعيرات الجذرية", "الأوراق"],
        correct: 1,
        hint: "الخشب واللحاء يوجدان داخل الساق لنقل الماء والغذاء."
      },
      {
        text: "أي الحيوانات التالية لا تُصنف ضمن الزواحف؟",
        options: ["السحلية", "الثعبان", "السلحفاة", "الضفدع"],
        correct: 3,
        hint: "الضفادع من البرمائيات وليست من الزواحف."
      },
      {
        text: "الخنفساء والجرادة تنتميان لمجموعة الحشرات؛ ما الصفة المشتركة بينهما؟",
        options: ["وجود هيكل خارجي", "درجة حرارة ثابتة", "وجود عمود فقري", "الشعر الكثيف"],
        correct: 0,
        hint: "الحشرات تمتلك هيكلًا خارجيًا مكونًا من الكيتين يحمي أجسامها."
      },
      {
        text: "نعلم أن الحمام من الطيور والجراد من الحشرات؛ ما الصفة المشتركة بينهما؟",
        options: ["تتكاثر بالبيوض", "لها عمود فقري", "تطرح هيكلها الخارجي عند النمو", "ليس لها عمود فقري"],
        correct: 0,
        hint: "العديد من الكائنات تضع البيض كطريقة للتكاثر بما في ذلك الطيور والحشرات."
      },
      {
        text: "في الشكل أدناه، دورة حياة نبات؛ أي من المصطلحات التالية يمثل نوع هذا النبات؟",
        options: ["نبات زهري", "نبات غير زهري", "نبات معمر", "نبات لا وعائي"],
        correct: 1,
        hint: "النباتات غير الزهرية مثل السراخس والصنوبريات تتكاثر دون أزهار."
      },
      {
        text: "وظيفة الطلع في الزهرة هي:",
        options: ["حماية الزهرة", "جذب الحشرات", "تكوين البويضات", "تكوين حبوب اللقاح"],
        correct: 3,
        hint: "الطلع هو الجزء الذكري من الزهرة وهو المسؤول عن إنتاج حبوب اللقاح."
      },
      {
        text: "أي الصفات التالية تعد صفة مشتركة بين كل من الأسماك والثعابين والضفادع؟",
        options: ["درجة الحرارة ثابتة", "درجة الحرارة متغيرة", "تتنفس بالرئتين", "حيوانات لا فقارية"],
        correct: 1,
        hint: "هذه الحيوانات من ذوات الدم البارد وتتغير درجة حرارة أجسامها مع البيئة."
      }
    ]
  }
];

let currentTestIndex = 0;
let currentQuestionIndex = 0;
let answers = [];

// عناصر المساعدة
const assistButtons = document.getElementById("assistButtons");
const eliminateButton = document.getElementById("eliminateButton");
const suggestButton = document.getElementById("suggestButton");

// عنصر التغذية الراجعة
const feedbackDiv = document.getElementById("feedback");

// مصفوفة تتبع الخيارات المستبعدة للسؤال الحالي
let eliminatedIndices = [];

const infoForm = document.getElementById("infoForm");
const quizSection = document.getElementById("quizSection");
const questionContainer = document.getElementById("questionContainer");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");
const resultContainer = document.getElementById("resultContainer");

// عند إرسال نموذج المعلومات الشخصية
infoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("studentName").value.trim();
  const school = document.getElementById("schoolName").value.trim();
  if (!name || !school) {
    alert("يرجى إدخال اسم الطالبة والمدرسة قبل بدء الاختبار.");
    return;
  }
  // إخفاء نموذج المعلومات وعرض الاختبار
  document.getElementById("infoSection").style.display = "none";
  quizSection.style.display = "block";
  // إرسال المعلومات إلى Google Sheets
  logVisitor(name, school);
  loadQuestion();
});

// تحميل السؤال الحالي وعرضه
function loadQuestion() {
  resultContainer.innerHTML = "";
  const test = tests[currentTestIndex];
  const question = test.questions[currentQuestionIndex];
  questionContainer.innerHTML = "";
  const questionDiv = document.createElement("div");
  questionDiv.className = "question";
  const questionText = document.createElement("h3");
  questionText.textContent = `${currentQuestionIndex + 1}. ${question.text}`;
  questionDiv.appendChild(questionText);
  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";
  question.options.forEach((opt, idx) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "question";
    input.value = idx;
    if (answers[currentTestIndex] && answers[currentTestIndex][currentQuestionIndex] == idx) {
      input.checked = true;
    }
    label.appendChild(input);
    label.appendChild(document.createTextNode(opt));
    optionsDiv.appendChild(label);
  });
  questionDiv.appendChild(optionsDiv);
  questionContainer.appendChild(questionDiv);

  // إعادة ضبط حالة الاستبعاد والترشيح
  eliminatedIndices = [];
  const allLabels = optionsDiv.querySelectorAll("label");
  allLabels.forEach((lbl) => {
    lbl.classList.remove("eliminated", "suggested");
    const input = lbl.querySelector("input");
    input.disabled = false;
    input.checked = !!(answers[currentTestIndex] && answers[currentTestIndex][currentQuestionIndex] == parseInt(input.value, 10));
  });
  assistButtons.style.display = "flex";
  eliminateButton.disabled = false;
  suggestButton.disabled = false;

  // إخفاء التغذية الراجعة القديمة
  feedbackDiv.style.display = "none";

  // تحديث أزرار التنقل
  prevButton.disabled = currentQuestionIndex === 0;
  const lastQuestion =
    currentTestIndex === tests.length - 1 &&
    currentQuestionIndex === tests[currentTestIndex].questions.length - 1;
  submitButton.style.display = lastQuestion ? "inline-block" : "none";
  nextButton.style.display = lastQuestion ? "none" : "inline-block";
}

// حفظ الإجابة المختارة
function saveAnswer() {
  const selected = document.querySelector('input[name="question"]:checked');
  if (!selected) {
    alert("يرجى اختيار إجابة قبل المتابعة.");
    return false;
  }
  if (!answers[currentTestIndex]) answers[currentTestIndex] = [];
  answers[currentTestIndex][currentQuestionIndex] = parseInt(selected.value, 10);
  return true;
}

// الزر "التالي"
nextButton.addEventListener("click", () => {
  if (!saveAnswer()) return;
  const test = tests[currentTestIndex];
  const question = test.questions[currentQuestionIndex];
  const userAns = answers[currentTestIndex][currentQuestionIndex];
  const isCorrect = userAns === question.correct;
  // إعداد رسالة التغذية الراجعة
  feedbackDiv.textContent = isCorrect
    ? "إجابة صحيحة، أحسنتِ!"
    : `إجابة غير صحيحة. الإجابة الصحيحة هي: ${question.options[question.correct]}. ${question.hint}`;
  feedbackDiv.className = "feedback " + (isCorrect ? "correct" : "wrong");
  feedbackDiv.style.display = "block";
  // تعطيل زر التالي مؤقتًا
  nextButton.disabled = true;
  // بعد فترة ننتقل للسؤال التالي
  setTimeout(() => {
    feedbackDiv.style.display = "none";
    nextButton.disabled = false;
    if (currentQuestionIndex < test.questions.length - 1) {
      currentQuestionIndex++;
    } else if (currentTestIndex < tests.length - 1) {
      currentTestIndex++;
      currentQuestionIndex = 0;
    }
    loadQuestion();
  }, 2000);
});

// الزر "السابق"
prevButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
  } else if (currentTestIndex > 0) {
    currentTestIndex--;
    currentQuestionIndex = tests[currentTestIndex].questions.length - 1;
  }
  loadQuestion();
});

// زر الإرسال (في آخر سؤال)
submitButton.addEventListener("click", () => {
  if (!saveAnswer()) return;
  const test = tests[currentTestIndex];
  const question = test.questions[currentQuestionIndex];
  const userAns = answers[currentTestIndex][currentQuestionIndex];
  const isCorrect = userAns === question.correct;
  feedbackDiv.textContent = isCorrect
    ? "إجابة صحيحة، أحسنتِ!"
    : `إجابة غير صحيحة. الإجابة الصحيحة هي: ${question.options[question.correct]}. ${question.hint}`;
  feedbackDiv.className = "feedback " + (isCorrect ? "correct" : "wrong");
  feedbackDiv.style.display = "block";
  submitButton.disabled = true;
  setTimeout(() => {
    feedbackDiv.style.display = "none";
    submitButton.disabled = false;
    showResults();
  }, 2000);
});

// زر استبعاد إجابتين
eliminateButton.addEventListener("click", () => {
  const test = tests[currentTestIndex];
  const question = test.questions[currentQuestionIndex];
  const numOptions = question.options.length;
  const labels = questionContainer.querySelectorAll("label");
  const candidateIndices = [];
  for (let i = 0; i < numOptions; i++) {
    if (i !== question.correct && !eliminatedIndices.includes(i)) {
      candidateIndices.push(i);
    }
  }
  if (candidateIndices.length < 2) {
    eliminateButton.disabled = true;
    return;
  }
  for (let n = 0; n < 2; n++) {
    const randomIndex = Math.floor(Math.random() * candidateIndices.length);
    const idx = candidateIndices.splice(randomIndex, 1)[0];
    eliminatedIndices.push(idx);
    const lbl = labels[idx];
    lbl.classList.add("eliminated");
    const input = lbl.querySelector("input");
    input.disabled = true;
    input.checked = false;
  }
  eliminateButton.disabled = true;
});

// زر ترشيح الإجابة
suggestButton.addEventListener("click", () => {
  const test = tests[currentTestIndex];
  const question = test.questions[currentQuestionIndex];
  const labels = questionContainer.querySelectorAll("label");
  labels.forEach((lbl, idx) => {
    lbl.classList.remove("suggested");
    if (idx === question.correct) {
      lbl.classList.add("suggested");
    }
  });
  let hintDiv = questionContainer.querySelector(".hint-div");
  if (!hintDiv) {
    hintDiv = document.createElement("div");
    hintDiv.className = "hint-div";
    hintDiv.style.marginTop = "1rem";
    hintDiv.style.padding = "0.5rem";
    hintDiv.style.backgroundColor = "#f9f5f2";
    hintDiv.style.border = "1px solid #e0dcd8";
    hintDiv.style.borderRadius = "4px";
    questionContainer.appendChild(hintDiv);
  }
  hintDiv.innerHTML = `<strong>التفسير:</strong> ${question.hint}`;
  suggestButton.disabled = true;
});

// عرض النتائج النهائية
function showResults() {
  questionContainer.innerHTML = "";
  document.getElementById("navigation").style.display = "none";
  assistButtons.style.display = "none";
  feedbackDiv.style.display = "none";
  let score = 0;
  let total = 0;
  const resultList = document.createElement("ol");
  tests.forEach((test, testIndex) => {
    test.questions.forEach((question, qIndex) => {
      total++;
      const userAnswer = answers[testIndex][qIndex];
      const isCorrect = userAnswer === question.correct;
      if (isCorrect) score++;
      const li = document.createElement("li");
      li.innerHTML =
        `<strong>${question.text}</strong><br>` +
        `إجابتك: <span style="color:${isCorrect ? 'green' : 'red'}">${question.options[userAnswer] ?? 'لم تُجب'}</span>` +
        `<br>الإجابة الصحيحة: ${question.options[question.correct]}` +
        (!isCorrect
          ? `<br><em>تعليق:</em> ${question.hint}`
          : "");
      resultList.appendChild(li);
    });
  });
  resultContainer.innerHTML = `<h3>النتيجة: ${score} من ${total}</h3>`;
  resultContainer.appendChild(resultList);
}

// إرسال البيانات إلى Google Sheets عبر تطبيق ويب
function logVisitor(name, school) {
  const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
  const formData = new FormData();
  formData.append("name", name);
  formData.append("school", school);
  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => response.text())
    .then((data) => {
      console.log("تم تسجيل الزيارة: " + data);
    })
    .catch((error) => console.error("حدث خطأ أثناء إرسال البيانات", error));
}
