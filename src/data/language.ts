import state from "./botStates";
let languages: any = {
  eng: {
    welcomeMessage: "Welcome {{username}}, I'm your VisionFund chatbot",
    languageChangeText: "Language change successfull",
    topMenu: {
      text: "I can help you with the following",
      myProfile: {
        label: "myProfile",
        text: "Profile",
        options: {
          editProfileData: {
            label: "Edit Profile Data",
            fields: {
              firstName: "Enter your First Name",
              lastName: "Enter your Last Name",
              phoneNumber:
                "Please provide your phone number by pressing the 'Share Contact' button",
              address: "Enter Your Address",
              branch: "Choose your preferred branch",
              visionFundCustomer: "Are You A VisionFund Microfinance Customer",
              accountUpdateSuccess:
                "Your account has been updated successfully",
              accountEditCancelled: "Account Editting cancelled.",
              followTheStepsToUpdate: "Follow the steps to update*",
            },
            errors: {
              finishUpdating: "Please finish updating your account",
              visionFundCustomerError:
                "Click button that corresponds with your answer",
            },
          },
          changeLanguage: {
            label: "Change Language",
            text: "Choose langage",
            languages: {
              English: "English",
              Amharic: "Amharic",
              Oromifa: "Oromifa",
              Tigri: "Tigri",
              Somali: "Somali",
            },
          },
        },
      },
      information: {
        label: "Information",
        text: "What would you like to know",
        options: {
          ourProducts: {
            label: "Our Products",
            text: "Choose type of products",
            options: {
              savingProducts: "Saving Products",
              loanProducts: "Loan Products",
            },
          },
          FAQs: "FAQs",
          aboutUs: "About Us",
          contactUs: { label: "Contact Us", text: "Our Contacts" },
        },
      },
      resources: {
        label: "Resources",
        options: {
          videoGuides: "video Guides",
          Documents: "Documents",
        },
      },
      shareFeedback: {
        label: "Share Feedback",
        text: "Please give us your comment or complaint on the text field bellow",
        options: {
          chooseBranch: "choose branch(optional)",
        },
      },
      takeSurvey: "Take a Survey",
    },
    back: "Back",
    home: "",
    cancel: "Cancel",
  },

  amh: {
    welcomeMessage: "እንኳን ደህና መጡ {{username}}, እኔ የእርስዎ የVisionFund ቻቦት ነኝ",
    languageChangeText: "የቋንቋ ለውጥ ተሳክቷል",
    topMenu: {
      text: "በሚከተለው ልረዳዎ እችላለሁ",
      register: { text: "ይመዝገቡ" },
      myProfile: {
        label: "የእኔ መለያ",
        text: "መለያ",
        options: {
          editProfileData: {
            label: "አካውንት መረጃ አስተካክል",
            fields: {
              firstName: "ስምዎን ያስገቡ",
              lastName: "የአባት ስምዎን ያስገቡ",
              phoneNumber: "እባኮትን 'መገናኛ አጋራ' ቁልፍ በመጫን የስልክ ቁጥርዎን ያቅርቡ",
              address: "አድራሻዎን ያስገቡ",
              branch: "የሚመረጥ ቅርንጫፍ ይምረጡ",
              visionFundCustomer: "የቪዥንፈንድ ደንበኛ ነዎት?",
              accountUpdateSuccess: "አካውንትዎ በትክክል ተዘምኗል",
              accountEditCancelled: "የአካውንት ማስተካከያ ተሰርዟል",
              followTheStepsToUpdate: "ለማዘመን እባኮትን የቀጥታ እርምጃዎችን ይከተሉ",
            },
            errors: {
              finishUpdating: "እባኮትን አካውንትዎን ማዘመን ያቅርቡ",
              visionFundCustomerError: "ለመልስዎ ተስማሚ የሆነውን አዝራር ይጫኑ",
            },
          },
          changeLanguage: {
            label: "ቋንቋ ይቀይሩ",
            text: "ቋንቋ ይምረጡ",
            languages: {
              English: "እንግሊዝኛ",
              Amharic: "አማርኛ",
              Oromifa: "ኦሮምኛ",
              Tigri: "ትግርኛ",
              Somali: "ሶማሌኛ",
            },
          },
        },
      },
      information: {
        label: "መረጃ",
        text: "ምን ማወቅ ይፈልጋሉ",
        options: {
          ourProducts: {
            label: "አቅርቦታችን",
            text: "Choose type of products",
            options: {
              savingProducts: "የ ቁጠባ አቅርቦት",
              loanProducts: "የ ብድር አቅርቦት",
            },
          },
          FAQs: "የሚጠየቁ ጥያቄዎች",
          aboutUs: "ስለ እኛ",
          contactUs: { label: "መገኛችን", text: "መገኛችን" },
        },
      },
      resources: {
        label: "መርጃዎች",
        options: {
          videoGuides: "የቪዲዮ መመሪያዎች",
          Documents: "ሰነዶች",
        },
      },
      shareFeedback: {
        label: "አስተያየትዎን ያጋሩ",
        text: "እባክዎን አስተያየትዎን ወይም ቅሬታዎን ከዚህ በታች ባለው የጽሑፍ መስክ ላይ ይስጡን።",
        options: {
          chooseBranch: "ቅርንጫፍ ይምረጡ (አማራጭ)",
        },
        cancelText: "አስተያየት ማጋራት ተሰርዟል።",
      },
      takeSurvey: "የዳሰሳ ጥናት ይውሰዱ",
    },
    back: "ወደኋላ",
    home: "ወደ መጀመሪያው",
    cancel: "ሰርዝ",
  },

  oro: {
    welcomeMessage:
      "Baga nagaan dhufte {{username}}, ani chatbot VisionFund keessaniiti",
    languageChangeText: "Jijjiiramni afaanii milkaa'aa",
    topMenu: {
      text: "Kanneen armaan gadiitiin si gargaaruu nan danda'a",
      myProfile: {
        label: "Profaayila koo",
        text: "Proofaayilii",
        options: {
          editProfileData: {
            label: "Odeeffannoo Profaayilii Sirreessi",
            fields: {
              firstName: "Maqaa Kee Galchi",
              lastName: "Maqaa Abbaa Kee Galchi",
              phoneNumber:
                "Lakk. bilbilaa keessan 'Kontaaktii Qoodi' jedhu cuqaasuun kennaa",
              address: "Teessoo Kee Galchi",
              branch: "Ganda Filadhu",
              visionFundCustomer: "Abbaa deeggarsa VisionFund tii?",
              accountUpdateSuccess: "Herregni kee milkaa’inaan haaromfameera",
              accountEditCancelled: "Sirreeffamni herregaa haqameera",
              followTheStepsToUpdate: "Haaromsuuf tarkaanfii hordofaa",
            },
            errors: {
              finishUpdating: "Herregni kee akka xumuramu gochuu qabda",
              visionFundCustomerError:
                "Deebii sirrii agarsiisuuf bakka madaaluu cuqaasi",
            },
          },
          changeLanguage: {
            label: "Afaan filadhu",
            text: "Afaan fili",
            languages: {
              English: "Ingiliiffa",
              Amharic: "Amaariffa",
              Oromifa: "Afaan Oromoo",
              Tigri: "Tigreeffaan",
              Somali: "Soomaali",
            },
          },
        },
      },
      information: {
        label: "Odeeffannoo",
        text: "Maal beekuu barbaadda",
        options: {
          ourProducts: {
            label: "Oomishaalee Keenya",
            text: "Akkaataa oomishaalee filadhu",
            options: {
              savingProducts: "Oomishaalee Qusachuu",
              loanProducts: "Oomishaalee Liqii",
            },
          },
          FAQs: "Gaaffii",
          aboutUs: "waa'ee Keenya",
          contactUs: { label: "Nu Qunnamaa", text: "Qunnamtii Keenya" },
        },
      },
      resources: {
        label: "Qabeenya",
        options: {
          videoGuides: "Qajeelfamoota viidiyoo",
          Documents: "Dokumantoota",
        },
      },
      shareFeedback: {
        label: "Yaada Qoodi",
        text: "Maaloo yaada ykn komii keessan dirree barreeffama armaan gadii irratti nuuf kennaa",
        options: {
          chooseBranch: "damee filadhu(dirqama)",
        },
        cancelText: "yaada qooduun haqame",
      },
      takeSurvey: "Qorannoo Fudhadhu",
    },
    back: "kan duraa",
    home: "gara begingingitti",
    cancel: "Haquu",
  },

  tig: {
    welcomeMessage: "እንቋዕ ብደሓን መጻእኩም {{username}}፣ ኣነ ናይ ቪዥንፋንድ ቻትቦትኩም እየ",
    languageChangeText: "ለውጢ ቋንቋ ዕዉት እዩ።",
    topMenu: {
      text: "በዚ ዝስዕብ ክሕግዘካ ይኽእል እየ",
      myProfile: {
        label: "ናይ ፕሮፋይለይ",
        text: "ፕሮፋይለይ",
        options: {
          editProfileData: {
            label: "ሓበሬታ መቀየሪ ናይ መንነት",
            fields: {
              firstName: "ሽምካ ኣእትው",
              lastName: "ሽም ኣቦኻ ኣእትው",
              phoneNumber: "'ናይ መርገም ቁጽሪ ስልኪ' መዝጊዕ ተጭነ ቁጽሪ ስልኪ ኣቅርብ",
              address: "ኣድራሻካ ኣእትው",
              branch: "ምርጫ ቅርንጫፍ ምረፅ",
              visionFundCustomer: "ደንበኛ ቪዥንፈንድ ኢኻ?",
              accountUpdateSuccess: "መንነትካ ብትኽክል ተመሓየሸ",
              accountEditCancelled: "ምቕያር መንነት ተተው",
              followTheStepsToUpdate: "ንምሓዝ እቲ እርምጃታት ተኸታተል",
            },
            errors: {
              finishUpdating: "እባክኻ ምሓዝ መንነትኻ ኣጠናቕቕ",
              visionFundCustomerError: "ናይ ትክክል መልሲ መዝጊዕ ጠቐም",
            },
          },
          changeLanguage: {
            label: "ቋንቋ ቀይሩ",
            text: "ቋንቋ ምረፅ",
            languages: {
              English: "እንግሊዝኛ",
              Amharic: "ኣማርኛ",
              Oromifa: "ኦሮምኛ",
              Tigri: "ትግርኛ",
              Somali: "ሶማሊ",
            },
          },
        },
      },
      information: {
        label: "ሓበሬታ",
        text: "እንታይ ክትፈልጥ ምደለኻ",
        options: {
          ourProducts: {
            label: "ፍርያትና",
            text: "ዓይነት ፍርያት ምረጽ",
            options: {
              savingProducts: "ምዕቋር ፍርያት",
              loanProducts: "ፍርያት ልቓሕ",
            },
          },
          FAQs: "ዝብል ሕቶታት ኣቕሪቡ።",
          aboutUs: "ብዛዕባና",
          contactUs: { label: "ርኸቡና", text: "ርክባትና" },
        },
      },
      resources: {
        label: "ጸጋታት",
        options: {
          videoGuides: "መምርሒታት ቪድዮ",
          Documents: "ሰነዳት",
        },
      },
      shareFeedback: {
        label: "ርእይቶ ምክፋል",
        text: "ኣብዚ ኣብ ታሕቲ ዘሎ ናይ ጽሑፍ ዓውዲ ርእይቶኹም ወይ ጥርዓንኩም ሃቡና",
        options: {
          chooseBranch: "ጨንፈር ምረጽ(ኣማራጺ)",
        },
        cancelText: "ርእይቶ ምክፋል ተሰሪዙ",
      },
      takeSurvey: "ዳህሳስ ውሰድ",
    },
    back: "ዝሓለፈ",
    home: "ናብ መጀመርታ",
    cancel: "ሰርዝ",
  },
  som: {
    welcomeMessage:
      "Ku soo dhawoow {{username}}, waxaan ahay VisionFund chatbotkaaga",
    languageChangeText: "Isbeddelka luqadda waa lagu guuleystay",
    topMenu: {
      text: "Waxaan kaa caawin karaa waxyaabaha soo socda",
      myProfile: {
        label: "aniga profile",
        text: "profile",

        options: {
          editProfileData: {
            label: "Xogta Profile-ka Tafatir",
            fields: {
              firstName: "Magacaaga Gali",
              lastName: "Magaca Aabahaa Gali",
              phoneNumber:
                "Fadlan lambarkaaga ku bixi adigoo gujinaya badhanka 'La wadaag Xogta'",
              address: "Cinwaankaaga Gali",
              branch: "Laanta aad dooratay xulo",
              visionFundCustomer: "Ma tahay macmiilka VisionFund?",
              accountUpdateSuccess:
                "Akaawnkaaga si guul leh ayaa loo cusbooneysiiyay",
              accountEditCancelled: "Tafatirka Akoonka waa la joojiyay",
              followTheStepsToUpdate:
                "Raac tallaabooyinka si aad u cusbooneysiiso",
            },
            errors: {
              finishUpdating: "Fadlan dhameystir cusbooneysiinta akoontigaaga",
              visionFundCustomerError: "Guji batoonka ku habboon jawaabtaada",
            },
          },
          changeLanguage: {
            label: "Luuqad beddel",
            text: "Dooro luuqadda",
            languages: {
              English: "Ingiriisi",
              Amharic: "Axmaari",
              Oromifa: "Oromoo",
              Tigri: "Tigree",
              Somali: "Soomaali",
            },
          },
        },
      },
      information: {
        label: "Macluumaad",
        text: "Maxaad jeceshahay inaad ogaato",
        options: {
          ourProducts: {
            label: "Alaabadayada",
            text: "Dooro nooca alaabta",
            options: {
              savingProducts: "Kaydinta Alaabta",
              loanProducts: "Alaabooyinka Amaahda",
            },
          },
          FAQs: "su'aalo la weydiiyay",
          aboutUs: "Nagu saabsan",
          contactUs: {
            label: "Nala soo xidhiidh",
            text: "Xidhiidhkayada",
          },
        },
      },
      resources: {
        label: "Ilaha",
        options: {
          videoGuides: "Tilmaamaha Fiidiyowga",
          Documents: "Dukumentiyada",
        },
      },
      shareFeedback: {
        label: "Aragtida yagaar",
        text: "Fadlan na sii faallooyinkaaga ama cabashadaada goobta qoraalka ee hoose",
        options: {
          chooseBranch: "dooro laan(ikhtiyaar)",
        },
        cancelText: "wadaag faallo celin waa la joojiyay",
      },
      takeSurvey: "Qaado Sahan",
    },
    back: "hore",
    home: "ilaa bilawgii",
    cancel: "Jooji",
  },
};
let currentLanguage = languages[state.currentUser.preferredLanguage];

function setCurrentLanguage(lang: string) {
  currentLanguage = languages[lang];
}

export { currentLanguage, setCurrentLanguage, languages };

// export default languages;
