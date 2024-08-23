const Host = require('./host.model');
const User = require('../user/user.model');
const Favorite = require('../favorite/favorite.model');
const arraySort = require('array-sort');
const fs = require('fs');
const { deleteFile, deleteVideo } = require('../../util/deleteFile');
const Language = require('../language/language.model');
const dayjs = require('dayjs');
const shuffle = require('../../util/shuffle');
const axios = require('axios');
const config = require('../../config');
const repeatArray = require('repeat-array');

//fill data
let array = [
  '#maa ki pyari beti#Dadi ki Jaan#Doston ki pgli#crazy for chocolate▪Ďad’z GirL👰',
  '▪Møm’z WorlĎ😘▪His PrincesŠ👸▪WiSh mě 🔛AuG 31🎂▪MuślimaH😍▪Bśc ŠtuďenT📚🔬',
  '▪LOVE❤FřńĐż👫ĎãņŹe💃▪MûZîc🎶ArTi§t🎨PhøTögraPhÝ📷✌💁Miss bharuchi👸🍫Wish Me On 16 May🎂👠Shøpìňğ ľøvěŕ👗📷Phøto løver📸',
  '👧I’m simpal but #BEAUTIFULL# Girl👰#sweet attitude 😘#miss. engineer 😂#single 😉#cute girl. 😇#birth 15 April 🎂',
  '#at junagadh…*I love singing & dancing😘🍕FooDiee📌music+art+literature=♥️📌I’m Not Better Than Anybody👉But Wise Enough To Know👉Don’t judge Me if u dont know😎',
  '💢 QUEEN👰OF INSTA📱💢 WISH🎁ME ON 12 NOVEMBER🎂💢 AMDAVADI🌇💢 CHOCOLATES🍫KI DIWANI😘💢 SELFIE🤳QUEEN👰💢 ATTITUDE😈MEANS A LOT😉💢 BEST👌PAGAL☺️',
  '▫ LOVE YOURSELF… 🤘▫ Simple girl without attitude… ♥✌▫ I know I’m lucky that I’m so cute… 👰▫ hEaRtFeLt… 🤘💕• Reserved from some1 who deserves👫',
  '• She 👸• Mahir Forever💑• You Are, All i Need👫• Yupp,She’s My lucky Charm🙌• Our Day – 12/10/19**💏',
  '😔ιииσ¢єит😔👯нαи∂ѕσмє👯🎧мυ¢ι¢ ℓσνєя🎧😮ѕєℓfιє ℓσνєя😮🎂ωιѕн. мєн σи 3 αυg🎂🙂ѕιмρℓє ℓινιиg нιgн тнιикιиg🙂😘zι∂∂ι😘',
  '🔻Wish Me On 24th April🍺🔻Madness For The Garba😊🔻Baroadian🌇🔻Selfieholic🤳🔻Photogenic📷🔻Bindass😄🔻Gujju Girl😉🔻Love The Songs Of Arijit😘',
  '★🔻 विश Me On 13th dec🍺☆Madनेस For The ride🚗★🔻Indian😎☆DRamA Queen👰★🔻फ़ोटोgenic📷☆Bindass😄★🔻Pizza Lover🍕☆फ्रेंndsforएवर👬',
  '18❤SelfiholicChocoholicDancer 🙌Relation status: with ice cream.choclatesFrst cry on Jan 27😉',
  'I am a nytmare dressed lyk a day dream👻😎A simple city Girl Dancing star 🌟Dance is, My life my everything 💙 I Don’t know who i am 🙆Just I Know That I Am A Dancer 💃',
  '★ DRamA Queen👰☆ C@ke MurDER On 20 Jan🍰★ MoM DaD lyf bRo Sis Love 👨👩👧☆ I lUv MY ATTituDe😎★ Be ROYal Lyf😚☆ Like dancing💃',
  '🎂3 Sept 1998#Drama queen😝#SuPergrl😜#SinGle😉#ChchLtes😍mY faVr8🍫#Fun Luving😎',
  '#Attitude For Those👇#Whom I hate😡#bLoW CaNdLes on 7th August🎂👉Moody 😘foody🍫🍝👉Childs lover😍👉Garba queen😘👉Dimapl girl 😊',
  '🖤”A real girl isn’t perfect and a perfect girl isn’t real”🖤💖Wish me ” 2nD April”🎂❤Music lover🎶🎵💟Selfie queen😍📸💝cHclTs lv🍫😚💗 Single but not available 😕',
  '🔮22 June📞🎁🍫🎂🔮Goal digger🔮Good vibes only💯🔮Fake acc.not accpt💯🔮Attitude unhe hi dikhati hujinhe tameez smjh nhi aati 💯',
  '♔Official account😎SînGle👍LoGin In The World 31 Jan🎂👔Simple girl♍I’m not Rich ßut I’m Royal 👑👍Live📿Laugh',
  '😊LoVe❤👕White Lover🎂CAké FáçÍaL Øñ 23øCt🎂😘LøVé💕MüSíc🎵💕Sιngle💕💞Love мyѕelғ!!💞',
  '👸Qυeen oғ own rυle👸✈️ŁΔŇD ŦØ β€ ŘΔΞŇβØŴ🌈ιn ѕoмeonѕ cloυd💭💫 LivE LikE 👑 KinG SizE👑💫 Hot 🔥17💫 Dogs 🐾',
  '💫 6th..April 🍰🍻🍰💫 Chocolate lover..🍫💫 Shopping 👗💄👠👢👛💫 Nail Art 💋💅💋💫 Single 💁',
  '☝️ Humble Enough To Know↗️ But Wise Enough To Know↘️ I’m Different From The Rest.➡️ And I’m Very Passionate Girl 👒',
  '💁 New id🤷 Singlə🙋 Wish mə on 25 m@y🙆 Papa’s Princěss👯 Mumma’s Doll🤸 My Bro’s.. My Heroes️🎵 Music Lover',
  '1️⃣ st 🖤 My Family👫 Forever My Frnds↪थोड़ी Pagal+Cute😍+Chsmish😳↪Dramebaaz Kudi😉↪Attitude + Sensitive😐',
  '↪1st Love …💜My Parents💜↪Chocolate Lover🍫↪”पापा की परी”👸Jadeja princess👸Royal rajputana👑Single 💕',
  'Attitude in my blood💫Management student📚Amdavadi😍Music lover🎧🎶On 25/3 my first cry🎂🎁👉Wish me on 14th oct 🎂🎂👉Garba lover 🙆🙆',
  '👉Selfi lover 📸📸👉Music lover 🎤🎤👉Gujju girl 👸👸👉Married on 20th January 👰💞👉Barodian 👼👼🌒khwabo_Di_Raani_👰',
  '👦Apne_baby_ki_Deewani_❤😙👩shopholic_👠🕶👜👗👱Selfie_Queen,😉🙆Bindass_girl_💃😄Always_happy_😊🍰Cake_murder_07/08🎂',
  'SwT nD sImPlE gIrl..fUlL pAgAl😋tHoDi Si zIdDiI + EmOtIoNaL😍😘SiNgLe❤ lOvE iS nOt oF mY tYpE😋U can HaTe mE bUt SorRy u cAn’T cHaNgE mE😉🎉Wish me on 27june1995🎂',
  '❤Single ❤😘 I’m the best BcoZ my Mam nd family zzz my life & AlsO frND😘Selfi QUeeN😊Wish me 1jun🎂NeW yr🎈',
  'DanCe💝Fav !!I like yoU As A💑frndsp.PAPA KI SHAAN👨MUMMY NI QUEEN👩I AM VERY FUNNY😉PRINCESS OF YOUR HEART💗',
  'Artist 👨🎤Drama 👸Dreamer 🙈Actor🎭Dancer💃Learner🤔🤓Fitness lover💪',
  '🔻Music is my life.🔺Dance lover….🔻Photo lover….🔺Sleeping is my best friend….🔻No love no tension….🔺Life is a song…love is the music….!!👉Dance Lover👔',
  '📚Study 📚🎧Music 💖😍Enjoyed….Life😍#Don’t follow to unfollow#🙈Moody❣️13teen😍Love mYself😍👄Red LoVer👄',
  '💕Soft hearted💕🎶Music LoVer🎶“👑Believe in myself👑🎂My day 29 March🎂🏖LoVe TraVeLinG”🎾 Badminton’s my soul 🎾😇 Dadies li’ll girl 😇',
  '😍😘 Addicted to justin bieber 😍😘😄 Frinds for life 😄🐩 Dog lover 🐩👉 My life💝👉 My choices😘👉 My mistakes😉👉 My lessons🤗👉 Not your business😏',
  '👔DaddY’s GiRL🚺🔷MuMma’s WorLD🔷😘LoVe mY fRieNdss👭😇1st cRy 15th AuGusT 🎂😋faN of 💚RaNbiR & DeEpiKa💚😏I don’t care no body Love me💖💖I am busy who loves me😎📱Selfie queen📱',
  '✈Love long drive✈💻Movie lover💻🎂Wish me on 4 April🎂💁No care is greater than dad’s care💕Diljit ki fan😍💃Dance is mah heartbeat💓29/9 🕶🎂🎁🎈',
  '🍫bUbblish 😘👗Love 👗💅💄👒👠👛I’m a princess 💖, not because I have a Prince, but because my dad is a king 👑📷 Photoholic 📱Selfieholic🎀 Bindass Gujju Girl',
  '🔊 Wish Me On 24th April👯 Madness For The Garba💜 Love The Songs Of Arijit😍Music💕lover Selfie Queen😎Mom Dad De ladali😘Single',
  '👑Queen Encounter 18aug Haapy🎂Love Me Hate Me I’dnt Care😘Student#Wish_me_1july🎂🍫🍪🍩🍡🍹#I_love_my_eyes👀👀#I_love_dance👯💃🙌#I_love_my_bestie_Frndz😍😘😘',
  '#In_open_Relationship_with_my_hubby😘😘😘❤ Daddy’s girl👧❤ Proud to be Patel 😎❤ First cry on 13 Nov 😭❤ Love me like you do😜❤ God is really creative…',
  'I mean😉 just look at me😛🙈🙉🙊👉 Daddy’s princess 👸 👸👉 Friendly gawl 😊👉 Wish me on 16th Jan 🤗👉 Leo gawl 👧👉❤ to Travel ✈🚄',
  '👉 Love to dance 😍👉 Single forever 🤘#attitude queen 👑#spicychilly 🔥#single😙#moody😳#daddy’s girl🤑',
  '#my day 30 october 🎂#insta luv❤#my haters :f**k 🖕#dont judge 😉👉 Medicoco.💊💉👉 Born 17th June.🎂🍾🍷👉 Capricorn.🐊👉 Karma believer.👊❤',
  '👉 Love Nature.🌱🌲👉 Shopaholic.🛍👗😘CaKe 🍰 KiLL 3SeP😘👸PaPa’S pRinCeSs👸🤗NeHA kAkkAr FaN.😎LoVe Is EaSy bUt QuEen iS BiZy.😠HaTe LoVe😠',
  '😇MaD foR 🎧SoNg.📖StuDy📖at CiVil💯% Standard Account.✔📷Love Photography✔🏅Bike Rider.✔💋MÖM Fïrst Kiss 25 Jan 1996✔👦Fâshïôñåblé.✔🙏Sanskari.✔',
  '📞Mob:-77—256 📲Whatsapp✔🎂My day 13 june🎉💄lipstick lover💄👩🎓College girl 📚kohli fan😌Moody😋',
  '😗I do what i love and love what i do💕😜Welcome To Pagli🏰🎂5July😊🏡Surat😍📏5.4💃Dance😘📷Photography❤👗FashionDesigner👚',
  'My📱number 800*******😅?😘 Falling in love with you was never my intention. ',
  '😘 Cut my 🎂 cake on 12 Jan.. 🎉🎁😍 Having me in your life is like a treat of happiness.❤ 8teen❤ 30 November mah day🎂',
  '💖Music mah life🎶👧Selfie queen📷🐶Dogs lover🐶😍Attitude queen🙈🍫Choco lover🍫🚗Hangout🚗👉_Attitude Wali Girl_😈',
  '👉_ crazy girl ₹.😎👉_Happy Wala B’day On 22 july _🍰👉_Love Music_🎶👉_ IT STUDENT 😀👉_ pizza lover 😋🍕love..dancing.😘😘luv ❤my❤ friends👈cute..girl👩',
  '👉enjoying✌✌..life💖love.😘.cooking.😆hihi🍜🍲👉wish.🎉🎉.me.🎊🎊on🎂.23th feb🍻➡️ I’m Not Better Than Anybodyy',
  '⭕️iPhone6+📱⭕️Humanity 😱⭕Happy soul 👻⭕️Dazzling star 💫⭕️Cheers Life ✌🏻⭕️Fashion Model 💃⭕️Goa 🏖',
  '⭕️Computer Engineer 👩🏻💻🔥Hot royal girl🔥🎉surprise me on 17 aug🎂🍫choclates lover🍫💓Bindass💓❎No relationshits😉😆M happy,bitches hate that😈l🍟foodie+moody😄',
  '📷Like Photography✔🐁Animal Lover✔🍬Chocolate Lover✔😭First Cry On 11th March✔💊Medical Student✔💓29/9 🕶🎂🎁🎈🍫bUbblish 😘👗Love 👗💅💄👒👠👛🌟I L♡ve Ganesha😍',
  '🌟MomDad😘🌟Kind~Heart💓🌟Stay~Cutiepie🙎🌟Whatever You Are, Be A Good One😇🌟Hater’s Uh Make Me Famous😂💗 Ñiřαli … 💗',
  '⭐ Selfi Queeñ… 👑💗 Papa’s Princes 👰⭐ Love dαñce & Gařbα 💃🏻💗 Love music 🎧⭐ Bdy Bαsh αt 11February 🎂🌒khwabo_Di_Raani_👰👦Apne_baby_ki_Deewani_❤😙👩shopholic_👠🕶👜👗',
  '👱Selfie_Queen,😉🙆Bindass_girl_💃😄Always_happy_😊I’m a princess 💖, not because I have a Prince, but because my dad is a king 👑📷 Photoholic :',
  '🎀 Bindass Gujju Girl🔊 Wish Me On 24th April👯 Madness For The Garba💜 Love The Songs Of Arijit✨Papa ki princess..👸',
  '✨Mumma ki angel..😇✨Brother ki ladli..😍😎✨Camera lover📷✨Musicholic🎶✨Selfie queen👑✨Mom💜Dad 💜Bhai✨19/4🎂💙Mom Dad is God💙',
  '➡️ But Wise Enough To Know➡️ I’m Different From The Rest.➡️And I’m Very Passionate Girl👒➡️I LOVE PHOTOGRAPHY📷',
  '❤ Music lover🎶❤ Papa ki princess👸❤ Single❤ Dramebaaz # ziddi 😎😂Poketz empty on 18 july😘',
];
repeatArray(array, 5);
//get host list from api
exports.fromAPI = async (req, res, next) => {
  try {
    const host = [];
    const language = await Language.find().select('_id');
    shuffle(language);
    await axios
      .get('https://zeep.live/api/video-list', {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDdjZmU2ZjZlNzgyOWI1YTJmZTI5MzhjODM1MzgxMzcyYjQ0MTBlNjgyYWViMzRjYzYxNjVhNDY0ZDkxZWNlZTMzYTFjNmQxYmQ2MTAzYzQiLCJpYXQiOjE2MjI1NDQ2NTgsIm5iZiI6MTYyMjU0NDY1OCwiZXhwIjoxNjU0MDgwNjU4LCJzdWIiOiIxMDgxMzQzMSIsInNjb3BlcyI6W119.YC7iB6SNh5gMq8ejTXk1enuBI_gCnBhGdOshx8BpXxp1M5aSZFRNXL1GiTXhK7TNVgpx-TVPMOiFpeWhNZpGgvmUpSs3XptSG0QbRlkNqpDLJF9DUzPS_gKZbNbUWwb4HRaGqWcrfR_ycYd0DtgPlmJ0Q32-erGS-dzByWYsTwmKn5VJ6B4SlEYZigOwcWyvF1qyUaouVmMiNdcEJNUscJz_es5-6waTtmQjCBvCoR9HjsQimW0vae8amXw2bPR_6CZKJ_LOEBOa6KmjrQgw6SX0NnzpMdmIASUdc2ECx_xBX7ofWJcpYQmNQMyLs_qn3bxke63vf8IpmvaRbti5pTSYycIP3YVK1Hz4ig79SL_cRFLRFAxmT1fL9MfiQ3n-f-TFG-WlGgU1Urhga2C-mG2ygGm2qKv2wU22jZICdW7M9BVwQDb11pa84fEUiUrNGUBoahgo8PrhCebvU35TzAHmxR2HlI3Am4j_taX5Z5_Cg8J2g54vidSegnFAFtWFQRRX_Hr9dsf0SyyQtJDZ74_RLHN9AIc7C-9Css4IuTj8jtQBPZ2PbktExH6ENKSS9ZTfXCm6q7FgF8DAakY8q0SZ-3E7WNltsYaxV3iS_sO-4EFRnbFx5gWPw-nw2IAJbgtK9v5ltIobvn8zFijS8FStlznS9iw50QJwE-7WISU',
          Accept: 'application/json',
        },
      })
      .then(async (response) => {
        console.log(response.data.result);
        await response.data.result.map(async (data, index) => {
          const isVideo = await Host.findOne({
            name: { $regex: data.user.name, $options: 'i' },
          });

          if (!isVideo) {
            const host = new Host();
            host.name = data.user.name ? data.user.name : 'Spriha';
            host.language = language[0]._id;
            host.age = Math.floor(Math.random() * 10) + 18;
            host.bio = array[index];
            host.image = data.user.profile_images[0]
              ? data.user.profile_images[0].image_name
              : 'null';
            host.image1 = data.user.profile_images[1]
              ? data.user.profile_images[1].image_name
              : 'null';
            host.image2 = data.user.profile_images[2]
              ? data.user.profile_images[2].image_name
              : 'null';
            host.video = data.video_name ? data.video_name : 'null';
            host.like = Math.floor(Math.random() * (500 - 100)) + 100;
            host.fromAPI = true;
            await host.save();
          }
        });

        // return res.status(200).json({ status: true, message: "Success!" });
      })
      .catch((error) => {
        // console.log(error);
      });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ status: false, error: error.message });
  }
};

//all host list
exports.hostList = async (req, res, next) => {
  try {
    // const start = req.query.start ? parseInt(req.query.start) : 1;
    // const limit = req.query.limit ? parseInt(req.query.limit) : 25;

    // const total = await Host.find({ isDeleted: false }).countDocuments();

    // const host = await Host.find({ isDeleted: false })
    //   .populate("language")
    //   .sort({ createdAt: -1 })
    //   .skip((start - 1) * limit)
    //   .limit(limit);
    const host = await Host.find({ isDeleted: false })
      .populate('language')
      .sort({ createdAt: -1 });

    if (!host) {
      return res
        .status(200)
        .send({ status: false, error: 'Internal server error' });
    }

    // return res.status(200).json({ status: true, host, total });
    return res.status(200).json({ status: true, host });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//create host
exports.hostStore = async (req, res, next) => {
  try {
    if (
      req.body.name &&
      req.body.language &&
      req.body.age &&
      req.body.bio &&
      req.body.imageType
    ) {
      const isLanguageExist = await Language.findById(req.body.language);
      if (!isLanguageExist)
        return res
          .status(500)
          .json({ status: false, message: "Oops ! Language doesn't exist" });

      const host = new Host();
      host.name = req.body.name;
      host.language = req.body.language;
      host.age = req.body.age;
      host.bio = req.body.bio;

      let imageArray = [];
      console.log(req.file);
      if (req.files) {
        req.files.map((data) => {
          if (data.mimetype.substring(0, 6) === 'image/') {
            imageArray.push(config.baseURL + data.path);
          }
        });
      }

      if (req.body.image && req.body.imageType === 'link') {
        var imageLinkList = req.body.image.split(',');
      }

      host.imageType = req.body.imageType;
      host.videoType = req.body.videoType;
      host.image = req.body.imageType === 'link' ? imageLinkList : imageArray;
      host.video =
        req.body.videoType === 'link'
          ? req.body.video
          : req.files.video
          ? config.baseURL + req.files.video[0].path
          : 'null';
      host.like = Math.floor(Math.random() * (500 - 100)) + 100;

      await host.save(async (error, host_) => {
        if (error)
          return res
            .status(200)
            .json({ status: false, error: error.message || 'server error' });
        else {
          const host = await Host.findById(host_._id).populate('language');
          return res.status(200).json({
            status: true,
            message: 'Host Add Successfully',
            host,
          });
        }
      });
    } else {
      if (req.files) deleteVideo(req.files);
      return res
        .status(500)
        .json({ status: false, message: 'Invalid details' });
    }
  } catch (error) {
    if (req.files) deleteVideo(req.files);
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//edit host
exports.hostEdit = async (req, res, next) => {
  try {
    debugger;
    const host = await Host.findById(req.params.host_id);
    if (!host) {
      if (req.file) deleteFile(req.file);
      return res.status(500).json({
        status: false,
        message: 'Oops ! host not found',
      });
    }

    const hostData = {};

    let imageArray = [];

    if (req.files) {
      console.log(req.files);
      req.files.map((data) => {
        if (data.mimetype.substring(0, 6) === 'image/') {
          imageArray.push(config.baseURL + data.path);
        }
      });
    }
    console.log(req.body.image, 'image');
    var imageLinkList = [];
    if (req.body.image && req.body.imageType === 'link') {
      imageLinkList = req.body.image.split(',');
    }

    hostData.imageType = req.body.imageType;

    if (host.imageType === 'link') {
      hostData.image =
        req.body.imageType === 'link' ? imageLinkList : imageArray;
    } else if (host.imageType === 'image') {
      hostData.image =
        req.body.imageType === 'image'
          ? host.image.concat(imageArray)
          : imageLinkList;
    }

    hostData.videoType = req.body.videoType;

    if (req.body.videoType === 'link') {
      // if (fs.existsSync("storage" + host.video.split("storage")[1]))
      //   fs.unlinkSync("storage" + host.video.split("storage")[1]);
      hostData.video = req.body.video;
    } else {
      // if (fs.existsSync("storage" + host.video.split("storage")[1]))
      //   fs.unlinkSync("storage" + host.video.split("storage")[1]);
      req.files.map((data) => {
        if (data.mimetype.substring(0, 6) === 'video/') {
          hostData.video = config.baseURL + data.path;
        }
      });
    }

    let isLanguageExist;
    if (req.body.language) {
      isLanguageExist = await Language.findById(req.body.language);
      if (!isLanguageExist)
        return res
          .status(500)
          .json({ status: false, message: "Oops ! Language doesn't exist" });
    }

    hostData.name = req.body.name;

    hostData.language = req.body.language;

    hostData.age = req.body.age;
    hostData.bio = req.body.bio;

    await Host.updateOne({ _id: req.params.host_id }, { $set: hostData }).exec(
      async (errorUpdate) => {
        if (errorUpdate)
          return res.status(200).json({ status: false, errorUpdate });
        const host = await Host.findOne({ _id: req.params.host_id }).populate(
          'language'
        );

        return res.status(200).send({
          status: true,
          message: 'Host details update successfully',
          host,
        });
      }
    );
  } catch (error) {
    if (req.file) deleteFile(req.file);
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//delete host image
exports.deleteImage = async (req, res) => {
  try {
    const host = await Host.findById(req.params.host_id);
    if (!host) {
      if (req.file) deleteFile(req.file);
      return res.status(500).json({
        status: false,
        message: 'Oops ! host not found',
      });
    }

    const image =
      host.image.length > 0 &&
      host.image[req.query.position] !== undefined &&
      host.image[req.query.position];

    const image_ = image.split('storage');

    if (image_) {
      if (fs.existsSync('storage' + image_[1])) {
        fs.unlinkSync('storage' + image_[1]);
      }
    }
    await host.image.splice(req.query.position, 1);
    await host.save();
    return res.status(200).json({ status: true, message: 'Success!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || 'Internal Server Error !',
    });
  }
};

//delete host
exports.hostDelete = async (req, res, next) => {
  try {
    const host = await Host.findById(req.params.host_id);

    if (!host) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! Host not found' });
    }

    await host.image.map((data) => {
      const image_ = data.split('storage');

      if (image_) {
        if (fs.existsSync('storage' + image_[1])) {
          fs.unlinkSync('storage' + image_[1]);
        }
      }
    });

    if (fs.existsSync(host.video)) {
      fs.unlinkSync(host.video);
    }
    await host.deleteOne();

    return res
      .status(200)
      .json({ status: true, message: 'delete', result: true });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//delete host (temporary)
exports.deleteHost = async (req, res, next) => {
  try {
    if (!req.params.host_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host id is required.' });
    const host = await Host.findById(req.params.host_id);
    if (!host) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host not found' });
    }
    await Host.updateOne(
      { _id: req.params.host_id },
      {
        $set: {
          isDeleted: true,
          isDisable: true,
          isOnline: false,
          isBusy: false,
        },
      }
    ).exec(async (errorUpdate) => {
      if (errorUpdate)
        return res.status(200).json({ status: false, errorUpdate });

      return res.status(200).send({
        status: true,
        message: 'Host delete  successfully',
      });
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//host enable-disable
exports.hostEnableDisable = async (req, res, next) => {
  try {
    const host = await Host.findById(req.params.host_id);
    if (!host) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host not found' });
    }

    host.isDisable = !host.isDisable;
    host.isOnline = false;
    host.isBusy = false;
    await host.save((error, host) => {
      if (error)
        return res
          .status(200)
          .json({ status: false, error: error.message || 'server error' });
      else
        return res.status(200).json({ status: true, message: 'success', host });
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//host profile
exports.hostProfileDetail = async (req, res, next) => {
  try {
    if (req.query.host_id) {
      const host = await Host.findOne({ _id: req.query.host_id });

      if (!host)
        return res
          .status(200)
          .json({ status: false, message: 'Oops ! something went wrong' });

      return res.status(200).json({ status: true, message: 'success', host });
    } else
      return res.status(200).send({ status: false, error: 'Invalid details' });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//when host is enter the app call this route for is online true
exports.hostOnline = async (req, res, next) => {
  try {
    if (!req.query.host_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host id is required.' });
    if (!req.query.token)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! token is required' });
    if (!req.query.channel)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! channel is required' });
    const host = await Host.findById(req.query.host_id);
    if (!host) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host not found' });
    }
    if (host.isDisable === false) {
      host.isOnline = true;
      host.isBusy = false;
      host.token = req.query.token;
      host.channel = req.query.channel;
      host.LastOnlineDate = new Date().toISOString().slice(0, 10);
      await host.save((error, host) => {
        if (error)
          return res
            .status(200)
            .json({ status: false, error: error.message || 'server error' });
        else return res.status(200).json({ status: true, message: 'success' });
      });
    } else {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! You are blocked by Admin' });
    }
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//when host is exit the app call this route for is online false
exports.hostOffline = async (req, res, next) => {
  try {
    if (!req.query.host_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host id is required.' });
    const host = await Host.findById(req.query.host_id);
    if (!host) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host not found' });
    }
    host.isOnline = true;

    await host.save((error, host) => {
      if (error)
        return res
          .status(200)
          .json({ status: false, error: error.message || 'server error' });
      else return res.status(200).json({ status: true, message: 'success' });
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//host thumb-list language wise
exports.globalThumbList = async (req, res, next) => {
  try {
    if (!req.query.language)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! language is Required' });

    if (!req.query.user_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! User id is Required' });

    const start = req.query.start ? parseInt(req.query.start) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;

    const userExist = await User.exists({ _id: req.query.user_id });

    if (!userExist)
      return res.status(200).json({
        status: false,
        message: "Oops ! user doesn't exist",
      });

    let image;
    if (req.query.language === 'ALL') {
      image = await Host.find({ isDisable: false })
        .sort({ createdAt: 1 })
        .populate('language');
    } else {
      image = await Host.find({
        language: req.query.language,
        isDisable: false,
        isDeleted: false,
      })
        .sort({ createdAt: 1 })
        .populate('language');
    }

    const IsLike = await Favorite.find({ user_id: req.query.user_id });

    const mainArr = await image.map((obj) => ({
      ...obj._doc,
      isLike: false,
    }));

    for (var i = 0; i < mainArr.length; i++) {
      await IsLike.map((IsLike) => {
        if (IsLike.host_id.toString() == mainArr[i]._id.toString()) {
          mainArr[i].isLike = true;
        }
        mainArr[i].isBusy = false;
        mainArr[i].isOnline = true;
      });
    }

    // arraySort(mainArr, "isOnline", { reverse: true });
    shuffle(mainArr);

    const data = mainArr.slice(start, 20 + start);

    return res.status(200).json({
      status: true,
      message: 'success',
      thumbList: data,
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//get single thumb
exports.singleThumbList = async (req, res, next) => {
  try {
    if (!req.query.language)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! language is Required' });

    if (!req.query.user_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! User id is Required' });

    if (!req.query.host_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! User id is Required' });

    const userExist = await User.exists({ _id: req.query.user_id });

    if (!userExist)
      return res.status(200).json({
        status: false,
        message: "Oops ! user doesn't exist",
      });

    let image;

    image = await Host.find({
      isDisable: false,
      isDeleted: false,
      _id: req.query.host_id,
    })
      .sort({ createdAt: 1 })
      .populate('language');

    const IsLike = await Favorite.find({ user_id: req.query.user_id });

    const mainArr = await image.map((obj) => ({
      ...obj._doc,
      isLike: false,
    }));

    for (var i = 0; i < mainArr.length; i++) {
      await IsLike.map((IsLike) => {
        if (IsLike.host_id.toString() == mainArr[i]._id.toString()) {
          mainArr[i].isLike = true;
        }
        mainArr[i].isBusy = false;
        mainArr[i].isOnline = true;
      });
    }

    shuffle(mainArr);
    arraySort(mainArr, 'isBusy');
    return res.status(200).json({
      status: true,
      message: 'success',
      thumbList: mainArr,
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//board (coin wise host)
exports.board = async (req, res, next) => {
  try {
    if (!req.query.user_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! User id is Required' });

    const userExist = await User.exists({ _id: req.query.user_id });

    if (!userExist)
      return res.status(200).json({
        status: false,
        message: "Oops ! user doesn't exist",
      });

    let image;
    image = await Host.find({ isDisable: false, isDeleted: false })
      .sort({ coin: -1 })
      .limit(30)
      .populate('language');

    const mainArr = await image.map((obj) => ({
      ...obj._doc,
      isLike: false,
    }));

    // arraySort(mainArr, "coin", { reverse: true });

    return res.status(200).json({
      status: true,
      message: 'success',
      thumbList: mainArr,
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//random host (match)
exports.randomHost = async (req, res, next) => {
  try {
    let image;

    image = await Host.find({ isDisable: false, isDeleted: false })
      .sort({ createdAt: 1 })
      .populate('language');

    const mainArr = await image.map((obj) => ({
      bio: obj.bio,
      isOnline: obj.isOnline,
      isBusy: obj.isBusy,
      like: obj.like,
      isDisable: obj.isDisable,
      coin: obj.coin,
      isLogout: obj.isLogout,
      isDeleted: obj.isDeleted,
      fromAPI: obj.fromAPI,
      video: obj.video,
      videoType: obj.videoType,
      _id: obj._id,
      name: obj.name,
      language: obj.language ? obj.language : {},
      age: obj.age,
      image: obj.image,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
      __v: 0,
      isLike: false,
    }));

    shuffle(mainArr);
    return res.status(200).json({
      status: true,
      message: 'success',
      thumbList: mainArr,
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//top all host leaderBoard (currentWeek,lastWeek)
exports.topHost = async (req, res, next) => {
  try {
    const total = await Host.find({ isDeleted: false }).countDocuments();

    const start = req.query.start ? parseInt(req.query.start) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : total;

    const host = await Host.find({ isDisable: false, isDeleted: false })
      .populate('language')
      .sort({ coin: -1 })
      .sort({ createdAt: -1 })
      .skip((start - 1) * limit)
      .limit(limit);

    return res
      .status(200)
      .json({ status: true, message: 'success', host, total });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//check host is busy or not
exports.isHostBusy = async (req, res, next) => {
  try {
    if (!req.query.host_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host id is required.' });
    const host = await Host.findById(req.query.host_id);
    if (!host) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host not found' });
    }
    if (host.isBusy === true)
      return res
        .status(200)
        .json({ status: true, message: 'This host is busy : true' });
    else
      return res
        .status(200)
        .json({ status: false, message: 'This host is busy : false' });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//delete host
exports.deleteHost = async (req, res, next) => {
  try {
    if (!req.params.host_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host id is required.' });
    const host = await Host.findById(req.params.host_id);
    if (!host) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host not found' });
    }
    await Host.updateOne(
      { _id: req.params.host_id },
      {
        $set: {
          isDeleted: true,
          isDisable: true,
          isOnline: false,
          isBusy: false,
        },
      }
    ).exec(async (errorUpdate) => {
      if (errorUpdate)
        return res.status(200).json({ status: false, errorUpdate });

      return res.status(200).send({
        status: true,
        message: 'Host delete  successfully',
      });
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//update coin through admin
exports.hostCoinUpdate = async (req, res) => {
  try {
    const host = await Host.findById(req.params.host_id);

    if (!host) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! host not found' });
    }

    host.coin = req.body.coin;

    await host.save();

    return res.status(200).send({
      status: true,
      message: 'Host Coin update successfully',
      host,
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//search host by their name for admin panel
exports.searchHostName = async (req, res, next) => {
  try {
    if (req.query.value) {
      const start = req.query.start ? parseInt(req.query.start) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 25;

      const value = await Host.find({
        isDeleted: false,
        $or: [
          { name: { $regex: req.query.value, $options: 'i' } },
          { languageName: { $regex: req.query.value, $options: 'i' } },
        ],
      }).populate('language');

      const populateValue = await Host.aggregate([
        {
          $lookup: {
            from: 'languages',
            localField: 'language',
            foreignField: '_id',
            as: 'language',
          },
        },
        {
          $match: {
            'language.language': { $regex: req.query.value, $options: 'i' },
          },
        },
      ]);
      // debugger;
      for (var i = 0; i < populateValue.length; i++) {
        populateValue[i].language = populateValue[i].language[0];
      }
      const concat = value.concat(populateValue);

      //remove duplicate object
      const uniq = Object.values(
        concat.reduce((acc, cur) => Object.assign(acc, { [cur._id]: cur }), {})
      );

      return res.status(200).json({
        status: true,
        host: uniq.slice((start - 1) * limit, limit),
        total: uniq.length,
      });
    } else {
      return res
        .status(200)
        .json({ status: false, message: 'Invalid Detail!' });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ status: false, error: error.message });
  }
};

//update like
exports.like = async (req, res, next) => {
  try {
    const host = await Host.find();
    await host.map(async (host) => {
      host.like = Math.floor(Math.random() * (500 - 100)) + 100;
      await host.save();
    });

    return res.send('success!');
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ status: false, error: error.message });
  }
};
