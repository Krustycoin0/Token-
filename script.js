      // Initialize Firebase
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
      };
      firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();


      new Vue({
        el: '#app',
        data: {
            tokens: [], 
            loading: true,
            error: null,
            newToken: {
                name: '',
                symbol: '',
                logo: '',
                price: 0,
                marketCap: 0,
                description: '',
                presale: false,
                presaleInfo: '',
                advisor: [] 
            },
            newAdvisor: {
                name: ''
            },
            tokenMessage: null,
            tokenError: null,
            advisorMessage: null,
            advisorError: null,
        },
        mounted() {
            this.fetchTokens();
              const swiper = new Swiper(".mySwiper", {
                effect: "coverflow",
                 grabCursor: true,
                 centeredSlides: true,
                 slidesPerView: "auto",
                  coverflowEffect: {
                   rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  },
                pagination: {
                   el: ".swiper-pagination",
                 },
               });
        },
        methods: {
            async fetchTokens() {
                this.loading = true;
                this.error = null;
                try {
                    const querySnapshot = await db.collection('tokens').orderBy('rank').get();
                    this.tokens = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        
                        return {
                            id: doc.id,
                            ...data
                        };
                    });
                } catch (err) {
                    this.error = "Error fetching tokens: " + err.message;
                } finally {
                    this.loading = false;
                }
            },
            async addToken() {
                this.tokenMessage = null;
                this.tokenError = null;
                try {
                    
                    const docRef = await db.collection('tokens').add(this.newToken);
                    this.tokenMessage = "Token added successfully!";
                    this.newToken = { 
                        name: '',
                        symbol: '',
                        logo: '',
                        price: 0,
                        marketCap: 0,
                        description: '',
                        presale: false,
                        presaleInfo: '',
                        advisor: []
                    };
                    this.fetchTokens(); 
                } catch (err) {
                    this.tokenError = "Error adding token: " + err.message;
                }
            },
            async addAdvisor() {
                this.advisorMessage = null;
                this.advisorError = null;
                try {
                  const tokensSnapshot = await db.collection('tokens').get();
                     if (!tokensSnapshot.empty) {
                        const firstTokenDoc = tokensSnapshot.docs[0];
                        const advisors = firstTokenDoc.data().advisor || [];
                           advisors.push(this.newAdvisor);
                           await db.collection('tokens').doc(firstTokenDoc.id).update({ advisor: advisors });
                         this.advisorMessage = "Advisor added successfully!";
                         this.newAdvisor.name = '';
                        this.fetchTokens();
                   }else {
                      this.advisorError = "Please add a token first!";
                     }
                   } catch (err) {
                      this.advisorError = "Error adding advisor: " + err.message;
                     }
               },
        },
      });
    </script>
