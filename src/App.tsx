import { useState, useEffect } from 'react'
import './App.css'

interface Message {
  id: number
  content: string
  timestamp: string
  created: string
  category: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('其他')
  const [filterCategory, setFilterCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: string; show: boolean }>({
    message: '',
    type: 'info',
    show: false
  })

  // 加载消息
  useEffect(() => {
    // 清除旧的本地存储数据，强制使用新的示例数据
    localStorage.removeItem('liuguangShiyuMessages')
    loadMessages()
    // 加载夜间模式设置
    const savedDarkMode = localStorage.getItem('liuguangShiyuDarkMode')
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // 夜间模式切换
  useEffect(() => {
    localStorage.setItem('liuguangShiyuDarkMode', JSON.stringify(isDarkMode))
    document.body.classList.toggle('dark-mode', isDarkMode)
  }, [isDarkMode])

  // 加载本地存储的消息
  const loadMessages = () => {
    try {
      const saved = localStorage.getItem('liuguangShiyuMessages')
      if (saved) {
        const parsedMessages = JSON.parse(saved)
        setMessages(parsedMessages)
      } else {
        // 添加示例数据
        const sampleMessages: Message[] = [
          {
            id: new Date('2018-03-15').getTime(),
            content: "人在社会，少不了和身边的人比较。显然，在比较中一定就会有得意或者失意。不管大家的关系有多好，或者有多少玩笑的性质。其实或多或少都会埋下嫉妒的种子。人不总是理性的、有道德的 —— 嫉妒可以使枝上的玫瑰凋萎。",
            timestamp: new Date('2018-03-15').toISOString(),
            created: new Date('2018-03-15').toISOString(),
            category: "哲理"
          },
          {
            id: new Date('2018-06-20').getTime(),
            content: "实际上，我们想要驯服这种原始的情绪，就得需不断驯服自己。****\"大家好才是真的好！\"**** 这句广告词是真正的道理。当你身边的人都比你强，那么恭喜你了，你其实也不会差。",
            timestamp: new Date('2018-06-20').toISOString(),
            created: new Date('2018-06-20').toISOString(),
            category: "哲理"
          },
          {
            id: new Date('2018-09-10').getTime(),
            content: "同样，宏观来讲，人都是社会化的动物，国家或组织发展的好，普通人才会好过。兴，百姓苦。亡，百姓只会更苦！",
            timestamp: new Date('2018-09-10').toISOString(),
            created: new Date('2018-09-10').toISOString(),
            category: "哲理"
          },
          {
            id: new Date('2025-01-15').getTime(),
            content: "清晨有感：\n\n赚钱的第一个阶段就是：打工。工作一小时，获得一小时的钱，只获得一小时的钱。\n赚钱的第二阶段就是：创作出某个东西，让它替你赚钱。比如写作、短视频，即使你在睡觉，也会有人看你的文章或视频，为你带来流量和收入。\n赚钱的第三个阶段就是：创造一个会不断学习、进步的东西，替你赚钱。比如阿尔法狗那样，不断在学，不知疲惫的向前。其实资本雇佣也算，智慧的工人也在不断进步为资本赚钱，但是现在这个时代资本压榨员工到变味了，就不好作例举了。",
            timestamp: new Date('2025-01-15').toISOString(),
            created: new Date('2025-01-15').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2025-01-10').getTime(),
            content: "年幼之时，总是会有一些不切实际的想法。有的遗忘在梦里，有的散落在时间的流逝中去，只有极一小部分能陪伴着你我长大、成熟。",
            timestamp: new Date('2025-01-10').toISOString(),
            created: new Date('2025-01-10').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2025-01-05').getTime(),
            content: "思来想去，有一件事我比较确信：****活着为了讲述****，这句话亦源自马尔克斯的自传 —— 《活着为了讲述》。\n\n你若是宇航员，畅游宇宙就是在\"讲述\"。你若是程序员，键写代码就是在\"讲述\"。拉长时间的维度，行业并无高低之分。不同身份的人用不同的方式讲述着不同的故事，将生活演绎为故事。此点我认为魔幻的部分偏多。",
            timestamp: new Date('2025-01-05').toISOString(),
            created: new Date('2025-01-05').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-12-25').getTime(),
            content: "今天六一，中午，在公司饭堂的时候，一口气删光了所有的朋友圈；\n\n其实在大学的时候，应该是2017年，就删过一次，后来用《亡命之徒》这首歌的分享作新的开始，后续又陆续分享了几十条；\n任何时候，给自己留有更多得选择权都是幸福的~~",
            timestamp: new Date('2024-12-25').toISOString(),
            created: new Date('2024-12-25').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-12-20').getTime(),
            content: "这个世界有两大阶级阵营，资产阶级阵营、无产阶级阵营。\n\n资产阶级掌握生产资料（钱、工具），无产阶级掌握劳动力（体力、脑力、工作时间）。\n\n- ***现实是资本在疯狂剥削、疯狂压榨、疯狂PUA劳动者****。\n\n996、大小周、暴力辞工、画大饼、职场洗脑、金融借贷等资本套路不胜枚举。\n\n资本家以资本为中心，而非以人为中心。\n\n历史在摇摆中前进，希望有一天：资本和劳动能达到平衡，相互尊敬。\n\n基于当下，则应该提高广大劳动者的收益。\n\n同时，也期望有创新科技带动更多的产能，无产阶级应当是智慧的、有活力的，人不是机器！",
            timestamp: new Date('2024-12-20').toISOString(),
            created: new Date('2024-12-20').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-12-15').getTime(),
            content: "天地不仁以万物为刍狗：\n\n>天地看待万物是一样的，不对谁特别好，也不对谁特别坏，一切随其自然发展。不仁便是仁。\n\n圣人不仁以百姓为刍狗；\n\n我以为：父母不仁，以子女为刍狗。更佳。\n\n其它为人处事之处亦如此，我们往往以主观的判断覆盖了对真实客观规律的洞察。",
            timestamp: new Date('2024-12-15').toISOString(),
            created: new Date('2024-12-15').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-12-10').getTime(),
            content: "程序员依托职业技能，幸得还有另外一种选择来讲述 —— **自建博客**。\n\n于我，首先博客是写自己想写，让自己看得舒服为首要。其次，再谈分享带来的 double happy 或成就感。\n\n我想写的分类，也是我一直感兴趣的领域是这些：技术笔记、读书笔记、生活笔记、科哲神学、地理游记、股票金融等。\n\n本人好奇心较重，虽说好奇是最好的老师，可光有好老师不行，自己如何能学好才是一个问题。\n\n记得初中老师说过一句：\"不怕慢，就怕站。\"在生活的洪流中坚守一个好习惯是不易的，期望自己能**步履不停**。\n\nPS：每年都会置顶写一篇文言文来记录当年感受。",
            timestamp: new Date('2024-12-10').toISOString(),
            created: new Date('2024-12-10').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-12-05').getTime(),
            content: "生活是无边的舞台，人生的百态，尽在其中。在学生时期的时候不以为然，在社会中沉浮，感受则尤为明显。人有不同，生活有不同，吾辈当接纳不同，不能走极端主义，也不能是打太极不作为。",
            timestamp: new Date('2024-12-05').toISOString(),
            created: new Date('2024-12-05').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-11-30').getTime(),
            content: "一日三餐、读书看报、综艺娱乐、电影电视、购物消费、旅游观光、运动健身、交友聚会、居家物业、还有理财？看病？房子车子？结婚？生育小孩？陪伴老人？......？更有耗掉人生至少三分之一时间的睡觉！你还有多少时间来专注做你想做的事？\n\n只能说****尽管去做****吧！",
            timestamp: new Date('2024-11-30').toISOString(),
            created: new Date('2024-11-30').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-11-25').getTime(),
            content: ">山不在高，有仙則名。水不在深，有龍則靈。斯是陋室，惟吾德馨。苔痕上階綠，草色入簾青。談笑有鴻儒，往來無白丁。可以調素琴，閱金經。無絲竹之亂耳，無案牘之勞形。南陽諸葛廬，西蜀子云亭。孔子云：何陋之有？\n\n再看《陋室铭》别有一番感想：现在的人追求流量、商业、变现，还有几个人能安于自己的陋室，在里面修养心性？\n\n对于内容创作者，流量大必然意味着内容直白、浅显，后续容易走形；\n\n\"谈笑有鸿儒\"，没有那么多\"鸿儒\"，大部分都是\"燕雀\"在叽叽喳喳；\n\n是在陋室里面修身，专研称为鸿儒，再静心等待鸿儒？\n\n还是去闹市中落俗，努力迎合流量，再设法圈钱跑路？\n\n是个问题！",
            timestamp: new Date('2024-11-25').toISOString(),
            created: new Date('2024-11-25').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-11-20').getTime(),
            content: "感情充沛的人有两类：\n\n1. 被保护的很好的人。\n\n2. 自身很坚强的人。\n\n感情充沛的人有能量、有创造性、也有破坏力。\n\n时常在想，如果遇事能再积极主动点或许会更好，但最后选择了怀疑、选择了保护自己？选择了维持现状、选择了观望，这其实，真不算好！",
            timestamp: new Date('2024-11-20').toISOString(),
            created: new Date('2024-11-20').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-11-15').getTime(),
            content: "人的一生就如一年四季。少年就是播种，青年就是生长，壮年就是收获，老年就是凋零。在对应的时间做该做的事，是最轻松的。想叛逆？那得做好受苦的准备。",
            timestamp: new Date('2024-11-15').toISOString(),
            created: new Date('2024-11-15').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-11-10').getTime(),
            content: "生命当中的每一天都是重要的！每一天的努力或者懈怠都会作用到将来的某一天。\n\n与同龄人的差距是慢慢拉开的！每次想到这个问题的时候，都可以选择拉开别人、或者被别人拉开。\n\n当然，希望你的每一天都是在享受的，享受与人之间的交往、享受专研工作、享受看看身边的世界。\n\n积蓄的力量超乎你的想象！而简单求快往往会丢失更多！想清楚点儿，Buddy！",
            timestamp: new Date('2024-11-10').toISOString(),
            created: new Date('2024-11-10').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-11-05').getTime(),
            content: "人真的那么容易遗忘吗？似乎是的。\n\n时间这个东西奇妙又残忍。\n\n孩童时期、学生时期，多少青涩、多少人与人之间的连接，都渐渐被遗忘，如果记得，珍惜庆幸。\n\n尊重过去，才能过好现在。\n\n如果有不好的记忆，但愿时间能治愈，最后都是要找到妥协的答案。",
            timestamp: new Date('2024-11-05').toISOString(),
            created: new Date('2024-11-05').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-10-30').getTime(),
            content: "谁知道前面的路会去往哪里呢？\n\n就像旅行者一号也不知道，带着人类的使命，只是向前就好。\n\n从各个总结来看，\"向前\"似乎就是面对迷茫最好的答案。\n\n遥望旅行者一号，****你要带着人类的希望飞的更远！salute!****",
            timestamp: new Date('2024-10-30').toISOString(),
            created: new Date('2024-10-30').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-10-25').getTime(),
            content: "人都是慕强的，不管你的职业是做什么！",
            timestamp: new Date('2024-10-25').toISOString(),
            created: new Date('2024-10-25').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-10-20').getTime(),
            content: "2021.5.13 凌晨梦到一位太久没联系的旧友，告诉她后，得知她竟然也在当夜梦到了我，神迹降临，简短记之。\n\n刚好最近又在看《低俗小说》，你说这是神迹吗？\n\n\"And I will execute great vengeance upon them with furious rebukes; and they shall know that I am the LORD, when I shall lay my vengeance upon them.\"\n这一定是一个神迹，我暂且将其埋在[这里]。",
            timestamp: new Date('2024-10-20').toISOString(),
            created: new Date('2024-10-20').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-10-15').getTime(),
            content: "本人最喜欢的作家有两位：加西亚·马尔克斯和曹雪芹，在某种程度上，我认为马尔克斯笔下的《百年孤独》和曹雪芹笔下的《红楼梦》都是魔幻现实。马孔多、宁荣街、炼金术师、跛足道人、幻化为蝶、石头传说、百年命运、家族兴衰，不一而足。（此处恨不能将二者穿越时空的联结叙说清楚）\n\n我读到了什么呢？\n\n概括为一句：生活即是魔幻与现实的结合。如果你是浪漫主义人格，就看其魔幻的部分。如果你是现实主义人格，就看其现实部分。",
            timestamp: new Date('2024-10-15').toISOString(),
            created: new Date('2024-10-15').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-10-10').getTime(),
            content: "我的生活信条，某些是要求、某些作出警醒、某些用以遥望。\n1. 从最坏处着眼，向最好处努力。—— 毛主席\n2. 简单，如此迷人。—— 《闻香识女人》\n3. 信念产生行动，行为养成习惯，习惯生成性格，性格决定命运。—— 约翰·凯恩斯\n4. 生命以负熵为食。—— 薛定谔\n5. 慎独。—— 《礼记·中庸》\n6. 生命的力量在于不顺从。 ——  冯骥才\n7. 学习是最好的解压方式。 —— 小学生\n8. 让朋友低估你的优点，让敌人高估你的缺点。 —— 《教父》\n9. 路遥知马力，事久见人心。—— 《事林广记》\n10. 不与夏虫语冰。 —— 孔子",
            timestamp: new Date('2024-10-10').toISOString(),
            created: new Date('2024-10-10').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2023-12-15').getTime(),
            content: "有的人的起点高，有的人的起点低，还有的人起点就在终点。\n\n但不过二八定律，大多数人的起点类似。\n\n若是房奴车奴卡奴，谁也别瞧不起谁。若是搞搞投机、恰得红利，谁也别太得意。\n\n人在现实世界的物质拥有上可分三六九等，但是灵魂上并无贵贱之分。所处境遇不同、悲喜的神经敏感不一，想必也各有感受。\n\n俗话说：慧极必伤，大约也是这个道理吧。机关算尽太聪明 反误了卿卿性命，也应了如此。\n\n说回到起点，****起点很重要****，起点高、跳板高、增速快、上限高，这是常规的线路，适用于大多数。\n\n再到如果起点低于身边的人，该如何呢？\n\n只得破釜沉舟、勇气开路、持之以恒、厚积薄发了吧。Maybe！\n\n在有得选的情况下，选择某个点作为起点，请慎重！",
            timestamp: new Date('2023-12-15').toISOString(),
            created: new Date('2023-12-15').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-01-20').getTime(),
            content: "马太效应思考：需要成功一次！提高核心竞争力！",
            timestamp: new Date('2024-01-20').toISOString(),
            created: new Date('2024-01-20').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-02-05').getTime(),
            content: "在这个世界上有两种人：一种是被吊的人 一种是切断吊索的人\n在这个世界上有两种人：一种人的枪装满子弹 一种人只会掘坟 If you work for a living, why do you kill yourself working -TUCO",
            timestamp: new Date('2024-02-05').toISOString(),
            created: new Date('2024-02-05').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-03-12').getTime(),
            content: "哪个少年不风流，哪个少女不怀春？食欲，性欲，名利欲 皆是人欲。人欲是与生俱来的，是人类生命相续的动力，每个人都希望得到满足。但现实又同时告诉我们，欲望是洪水猛兽，是万丈深渊！欲望总是贪得无厌。",
            timestamp: new Date('2024-03-12').toISOString(),
            created: new Date('2024-03-12').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-04-08').getTime(),
            content: "信念产生行动，行为养成习惯，习惯生成性格，性格决定命运。",
            timestamp: new Date('2024-04-08').toISOString(),
            created: new Date('2024-04-08').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-05-15').getTime(),
            content: "这个世界既不黑，也不白，而是一道精致的灰。",
            timestamp: new Date('2024-05-15').toISOString(),
            created: new Date('2024-05-15').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-06-22').getTime(),
            content: "读史使人明智，读诗使人灵秀，数学使人周密，科学使人深刻，伦理学使人庄重，逻辑修辞之学使人善辩：凡有所学，皆成性格。",
            timestamp: new Date('2024-06-22').toISOString(),
            created: new Date('2024-06-22').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-07-30').getTime(),
            content: "呜呼！吾子其去此，而务学也哉！博观而约取，厚积而薄发，吾告子止于此矣。",
            timestamp: new Date('2024-07-30').toISOString(),
            created: new Date('2024-07-30').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-08-14').getTime(),
            content: "大江东去，浪淘尽，千古风流人物。故垒西边，人道是：三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。",
            timestamp: new Date('2024-08-14').toISOString(),
            created: new Date('2024-08-14').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-09-05').getTime(),
            content: "生产带来财富！如果每天在各类平台生产的内容有 5000 阅读量，那相当于一个火爆个人网站的站长了；流量、名气背后是信任，信任背后是财富；",
            timestamp: new Date('2024-09-05').toISOString(),
            created: new Date('2024-09-05').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-10-18').getTime(),
            content: "所有东西都是波、波粒二象性是波转向粒子的过程、并不是说即是波又是粒子",
            timestamp: new Date('2024-10-18').toISOString(),
            created: new Date('2024-10-18').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-11-25').getTime(),
            content: "都是绵羊，只敢观望，习惯沉默，害怕争先。而争先是领导的要素，是话语权的要素。是看客？还是弄潮？——风浪越大鱼越贵，关键是：舞台这么大，你敢上台吗？？信心最重要，信心都没有，还谈个屁。看的长远，不计一时得失。泰山崩于眼前而不改色的气量。",
            timestamp: new Date('2024-11-25').toISOString(),
            created: new Date('2024-11-25').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2024-12-10').getTime(),
            content: "不要把工作的球留在脚底下，踢出去要，另外，压力不是来源于工作，而是来源于本可以做但没做的、找了借口拖延的工作",
            timestamp: new Date('2024-12-10').toISOString(),
            created: new Date('2024-12-10').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2025-01-08').getTime(),
            content: "有些话，你不说你就是他的主人。一旦说出来，你就成了它的奴隶！！",
            timestamp: new Date('2025-01-08').toISOString(),
            created: new Date('2025-01-08').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2025-02-14').getTime(),
            content: "七大罪分别是傲慢、嫉妒、暴怒、懒惰、贪婪、暴食和色欲",
            timestamp: new Date('2025-02-14').toISOString(),
            created: new Date('2025-02-14').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2025-03-20').getTime(),
            content: "骏马面前无沟壑 怂人面前全是坎",
            timestamp: new Date('2025-03-20').toISOString(),
            created: new Date('2025-03-20').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2025-04-12').getTime(),
            content: "要做一个幸存者，不要做一个受害者",
            timestamp: new Date('2025-04-12').toISOString(),
            created: new Date('2025-04-12').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2025-05-30').getTime(),
            content: "《大明1566》嘉靖：你们要把这句话记住了，所谓江山，是名江山，而非实指江山。君既不是山，臣民便不是江。古人称长江为江，黄河为河，长江水清，黄河水浊，长江在流，黄河也在流。古谚云'圣人出，黄河清'，可黄河什么时候清过？长江之水灌溉了两岸数省之田地，黄河之水也灌溉了数省两岸之田地。只能不因水清而偏用，也只能不能因水浊而偏废，自古皆然。这个海瑞不懂这个道理，在奏疏里劝朕只能用长江而非黄河，朕岂可乎？反之，黄河一旦泛滥，朕便治理，这就是朕为什么罢严嵩杀严世蕃等人的道理；再反之，长江一旦泛滥，朕也要治理，这便是朕为什么要罢黜杨廷和、夏言，杀杨继盛、沈链等人的道理。比方这个海瑞，自以为清流，将君父比作为山，水却淹没了山头，这便是泛滥。",
            timestamp: new Date('2025-05-30').toISOString(),
            created: new Date('2025-05-30').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2025-06-15').getTime(),
            content: "性格写在唇边，幸福露在眼角。理性感性寄于声线，真诚虚伪映在瞳仁。站姿看出才华气度，步态可见自我认知。表情里有近来心境，眉宇间是过往岁月。",
            timestamp: new Date('2025-06-15').toISOString(),
            created: new Date('2025-06-15').toISOString(),
            category: "生活"
          },
          {
            id: new Date('2025-07-01').getTime(),
            content: "《至黎明》\n今天就是人生，就是一切。\n它转瞬即逝，\n却蕴含着生命的全部成果：\n成长的欢乐，\n拼搏的荣誉，\n美景就在今天呈现。\n昨日如梦，\n明天只是一个幻影。\n认真地活在今天，\n昨日的梦想，\n都在今朝实现；\n而明天的憧憬，\n必将成为真实的希望。\n所以，珍惜今日\n就是我们对黎明最好的问候",
            timestamp: new Date('2025-07-01').toISOString(),
            created: new Date('2025-07-01').toISOString(),
            category: "生活"
          }
        ]
        // 按时间从新到旧排序
        const sortedMessages = sampleMessages.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        setMessages(sortedMessages)
        saveMessages(sortedMessages)
      }
    } catch (error) {
      console.error('加载失败:', error)
      showNotification('加载历史记录失败', 'error')
    }
  }

  // 保存消息到本地存储
  const saveMessages = (messagesToSave: Message[]) => {
    try {
      localStorage.setItem('liuguangShiyuMessages', JSON.stringify(messagesToSave))
    } catch (error) {
      console.error('保存失败:', error)
      showNotification('保存失败，请检查浏览器存储空间', 'error')
    }
  }

  // 显示通知
  const showNotification = (message: string, type: string = 'info') => {
    setNotification({ message, type, show: true })
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 3000)
  }

  // 处理发布
  const handlePublish = () => {
    const content = inputValue.trim()
    if (!content) {
      showNotification('请输入一些内容...', 'warning')
      return
    }
    if (editingId !== null) {
      // 编辑模式
      const updatedMessages = messages.map(msg => 
        msg.id === editingId 
          ? { ...msg, content, timestamp: new Date().toISOString(), category: selectedCategory }
          : msg
      ).sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      setMessages(updatedMessages)
      saveMessages(updatedMessages)
      setEditingId(null)
      showNotification('流光拾语更新成功！', 'success')
    } else {
      // 新建模式
      const newMessage: Message = {
        id: Date.now(),
        content: content,
        timestamp: new Date().toISOString(),
        created: new Date().toISOString(),
        category: selectedCategory
      }
      const updatedMessages = [newMessage, ...messages].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      setMessages(updatedMessages)
      saveMessages(updatedMessages)
      showNotification('流光拾语发布成功！', 'success')
    }
    setInputValue('')
    setSelectedCategory('其他')
  }

  // 开始编辑
  const startEdit = (id: number) => {
    const message = messages.find(msg => msg.id === id)
    if (message) {
      setEditingId(id)
      setInputValue(message.content)
      setSelectedCategory(message.category || '其他')
      showNotification('正在编辑...', 'info')
    }
  }

  // 删除消息
  const deleteMessage = (id: number) => {
    if (confirm('确定要删除这条流光拾语吗？')) {
      const updatedMessages = messages.filter(msg => msg.id !== id)
      setMessages(updatedMessages)
      saveMessages(updatedMessages)
      showNotification('流光拾语已删除', 'info')
    }
  }

  // 获取筛选后的消息
  const getFilteredMessages = () => {
    let filtered = messages
    
    // 先按分类筛选
    if (filterCategory !== '全部') {
      filtered = filtered.filter(message => message.category === filterCategory)
    }
    
    // 再按搜索关键词筛选
    if (searchQuery.trim()) {
      filtered = filtered.filter(message => 
        message.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filtered
  }

  // 获取统计数据
  const getStats = () => {
    const totalMessages = messages.length
    const categoryStats = messages.reduce((acc, message) => {
      const category = message.category || '其他'
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const totalCharacters = messages.reduce((acc, message) => acc + message.content.length, 0)
    const avgLength = totalMessages > 0 ? Math.round(totalCharacters / totalMessages) : 0
    
    const thisYear = new Date().getFullYear()
    const thisYearMessages = messages.filter(message => 
      new Date(message.timestamp).getFullYear() === thisYear
    ).length
    
    return {
      totalMessages,
      categoryStats,
      totalCharacters,
      avgLength,
      thisYearMessages
    }
  }

  // 格式化时间
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleDateString('zh-CN')
    } else {
      return date.toLocaleDateString('zh-CN')
    }
  }

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handlePublish()
    }
  }

  const stats = getStats()

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="header-top">
          <h1 className="title">流光拾语</h1>
          <div className="header-controls">
            <button 
              className="theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? '切换到日间模式' : '切换到夜间模式'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button 
              className="stats-toggle"
              onClick={() => setShowStats(!showStats)}
              title="查看统计信息"
            >
              📊
            </button>
          </div>
        </div>
        <p className="subtitle">拾起流光中的只言片语，记录心灵的微澜</p>
      </header>

      <main className="main">
        {/* 统计面板 */}
        {showStats && (
          <div className="stats-panel">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{stats.totalMessages}</div>
                <div className="stat-label">总言论数</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.totalCharacters}</div>
                <div className="stat-label">总字符数</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.avgLength}</div>
                <div className="stat-label">平均长度</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.thisYearMessages}</div>
                <div className="stat-label">今年言论</div>
              </div>
            </div>
            <div className="category-stats">
              <h3>分类统计</h3>
              <div className="category-bars">
                {Object.entries(stats.categoryStats).map(([category, count]) => (
                  <div key={category} className="category-bar">
                    <div className="category-name">{category}</div>
                    <div className="bar-container">
                      <div 
                        className="bar-fill" 
                        style={{ 
                          width: `${(count / stats.totalMessages) * 100}%`,
                          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
                        }}
                      ></div>
                    </div>
                    <div className="category-count">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 搜索区域 */}
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索流光拾语内容..."
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
                title="清除搜索"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 筛选区域 */}
        <div className="filter-section">
          <div className="filter-container">
            <span className="filter-label">分类筛选：</span>
            <div className="filter-buttons">
              {['全部', '生活', '哲理', '情感', '幽默', '诗歌', '随笔', '其他'].map(category => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`filter-btn ${filterCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 输入区域 */}
        <div className="input-section">
          <div className="input-container">
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="写下你的流光拾语..."
              className="message-input"
            />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="生活">生活</option>
              <option value="哲理">哲理</option>
              <option value="情感">情感</option>
              <option value="幽默">幽默</option>
              <option value="诗歌">诗歌</option>
              <option value="随笔">随笔</option>
              <option value="其他">其他</option>
            </select>
            <button onClick={handlePublish} className="publish-btn">
              <span className="btn-text">
                {editingId !== null ? '更新' : '发布'}
              </span>
              <span className="btn-icon">
                {editingId !== null ? '✏️' : '✨'}
              </span>
            </button>
          </div>
        </div>

        {/* 消息区域 */}
        <div className="messages-section">
          <h2 className="section-title">
            流光拾语片段
            {filterCategory !== '全部' && (
              <span className="filter-indicator"> - {filterCategory}</span>
            )}
            {searchQuery && (
              <span className="search-indicator"> - 搜索: "{searchQuery}"</span>
            )}
          </h2>
          <div className="messages-container">
            {getFilteredMessages().length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💭</div>
                <div className="empty-state-text">
                  {searchQuery 
                    ? `没有找到包含"${searchQuery}"的流光拾语` 
                    : filterCategory === '全部' 
                      ? '还没有流光拾语，快来发布第一条吧！' 
                      : `没有${filterCategory}分类的流光拾语，快来发布一条吧！`
                  }
                </div>
              </div>
            ) : (
              getFilteredMessages().map(message => (
                <div key={message.id} className="message-card">
                  <div className="message-content">{message.content}</div>
                  <div className="message-meta">
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                    <div className="message-category-tag">
                      {message.category || '其他'}
                    </div>
                    <div className="message-actions">
                      <button 
                        className="action-btn edit-btn" 
                        onClick={() => startEdit(message.id)}
                        title="编辑"
                      >
                        ✏️ 编辑
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        onClick={() => deleteMessage(message.id)}
                        title="删除"
                      >
                        🗑️ 删除
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2021 流光拾语 - 在流光中拾起你的心语片段</p>
      </footer>

      {notification.show && (
        <div className={`notification show ${notification.type}`}>
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  )
}

export default App
