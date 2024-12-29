const app = new Vue({
    el: '#app',
    data: {
        user: null,
        loadingTokens: true,
        tokens: [],
        tokenData: {},
        advisors: [],
        newToken:{
            name: null,
            symbol:null,
            description: null,
            isPresale: false,
            presaleInfo: null,
        },
        newAdvisor:{
            name: null
        },
        tokenMessage: null,
        tokenError: null,
        advisorMessage: null,
        advisorError: null,
        error: null
    },
    mounted() {
        // Initialize Firebase
         const firebaseConfig = {
            apiKey: "YOUR_FIREBASE_API_KEY",
            authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
            projectId: "YOUR_FIREBASE_PROJECT_ID",
            storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
            messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
            appId: "YOUR_FIREBASE_APP_ID"
        };
        firebase.initializeApp(firebaseConfig);

        // Initialize authentication state listener
        firebase.auth().onAuthStateChanged(user => {
            this.user = user ? user : null;
            console.log('User status changed:', this.user);
        });

        // Load tokens from database (Firebase)
        this.loadTokens();

    },
    methods: {
        login() {
             // Firebase UI Login With Google
            const provider = new firebase.auth.GoogleAuthProvider();
             firebase.auth().signInWithPopup(provider)
                 .then(result => {
                   this.user = result.user
                 })
                .catch(error => {
                  this.error = error.message;
                   console.log('Login Error', error)
               });

         },
        logout() {
            firebase.auth().signOut();
        },
        async loadTokens() {
           try{
              const db = firebase.firestore();
               const tokensCollection = await db.collection('tokens').get();

               if(!tokensCollection.empty){
                 this.tokens = tokensCollection.docs.map(doc => {
                    const data = doc.data()
                     return {id: doc.id, ...data};
                 });
                   this.loadingTokens = false;
               }else {
                 this.tokens = [];
                this.loadingTokens = false;
               }

           }catch(error){
            this.error = error.message;
            this.loadingTokens = false;
             console.log('Load Tokens Error: ', error)
          }
        },
         async addToken(){
           try {
              const db = firebase.firestore();
              const tokenToAdd = {...this.newToken}

              await db.collection('tokens').add(tokenToAdd);

               this.tokenMessage = 'Token Added Successfully'
               this.newToken = {
                    name: null,
                    symbol: null,
                    description: null,
                   isPresale: false,
                    presaleInfo: null
                };
               this.loadTokens()
            }catch(error){
              this.tokenError = error.message;
               console.log("Add Token Error: ", error)
           }
             setTimeout(() => {
                this.tokenMessage = null;
                this.tokenError = null;
             }, 3000)
         },
       async addAdvisor(){
           try {
               const db = firebase.firestore();
              const advisorToAdd = {...this.newAdvisor};
             const tokensCollection = await db.collection('tokens').get();

               if(!tokensCollection.empty){
                   const firstToken = tokensCollection.docs[0];

                   const advisors = firstToken.data().advisors || [];

                    advisors.push(advisorToAdd.name);
                    await db.collection('tokens').doc(firstToken.id).update({ advisors });
                   this.advisorMessage = "Advisor Added Successfully";
                   this.newAdvisor = {name: null};
                   this.loadTokens()
                }
             }catch(error){
                this.advisorError = error.message;
                 console.log('Add Advisor Error: ', error)
            }
             setTimeout(() => {
                this.advisorMessage = null;
                this.advisorError = null;
             }, 3000)
         }
    }
});
