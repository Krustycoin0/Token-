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
            fetchTokens() {
                this.loading = true;
                this.error = null;
               try{
                    this.tokens = [
                        {
                            id: 1,
                            rank: 1,
                            name: 'Bitcoin',
                            symbol: 'BTC',
                            price: 42000,
                            marketCap: 823000000000,
                            description: 'The original cryptocurrency',
                            logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
                             advisor: [
                               {id: 1, name: 'Satoshi N.'},
                             ]
                        },
                          {
                            id: 2,
                            rank: 2,
                            name: 'Ethereum',
                            symbol: 'ETH',
                             price: 2200,
                             marketCap: 270000000000,
                            description: 'A platform for decentralized applications',
                              logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
                                advisor: [
                                 {id: 2, name: 'Vitalik B.'},
                                ]
                          },
                          {
                            id: 3,
                             rank: 3,
                             name: 'Tether',
                            symbol: 'USDT',
                            price: 1.00,
                              marketCap: 83000000000,
                            description: 'A stablecoin pegged to the US dollar',
                              logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
                               advisor: [
                                    {id: 3, name: 'John S.'},
                                     {id: 4, name: 'Mark T.'}
                              ]
                           },
                          {
                             id: 4,
                              rank: 4,
                              name: 'Binance Coin',
                              symbol: 'BNB',
                               price: 300,
                              marketCap: 47000000000,
                              description: 'The native token of Binance exchange',
                              logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
                               advisor:[]
                             },
                          {
                            id: 5,
                            rank: 5,
                            name: 'Cardano',
                             symbol: 'ADA',
                            price: 0.50,
                             marketCap: 17000000000,
                            description: 'A proof-of-stake blockchain platform',
                             logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
                             advisor: [
                               {id: 5, name: 'Charles H.'},
                            ]
                         },
                           {
                             id: 6,
                             rank: 6,
                              name: 'Ripple',
                              symbol: 'XRP',
                             price: 0.60,
                             marketCap: 31000000000,
                            description: 'A digital payment protocol',
                               logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
                             advisor: []
                             },
                            {
                                id: 7,
                                rank: 7,
                                name: 'Solana',
                                symbol: 'SOL',
                                 price: 100,
                                  marketCap: 42000000000,
                                description: 'A high-performance blockchain',
                                logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
                                advisor: []
                             },
                            {
                                id: 8,
                               rank: 8,
                                name: 'Polkadot',
                                 symbol: 'DOT',
                                price: 7.00,
                                 marketCap: 8000000000,
                               description: 'A multichain network',
                               logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
                                 advisor: []
                            },
                            {
                               id: 9,
                               rank: 9,
                               name: 'Dogecoin',
                               symbol: 'DOGE',
                                price: 0.08,
                                 marketCap: 11000000000,
                               description: 'A meme-inspired cryptocurrency',
                               logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
                              advisor: []
                            },
                            {
                                id: 10,
                               rank: 10,
                                name: 'Litecoin',
                               symbol: 'LTC',
                              price: 70,
                               marketCap: 5000000000,
                               description: 'A peer-to-peer internet currency',
                               logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
                              advisor: []
                            },
                           {
                               id: 11,
                               rank: 11,
                                name: 'Shiba Inu',
                                symbol: 'SHIB',
                                 price: 0.00001,
                                 marketCap: 6000000000,
                               description: 'A meme token',
                               logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png",
                                advisor: []
                            },
                    ];
                     this.loading = false;
               } catch(err){
                    this.error = "Error fetching tokens: " + err.message;
                     this.loading = false;
               }
            },
            async addToken() {
                this.tokenMessage = null;
                this.tokenError = null;
                try {
                    this.newToken.rank = this.tokens.length + 1;
                    this.newToken.advisor = [];
                    this.tokens.push(this.newToken);
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
                } catch (err) {
                    this.tokenError = "Error adding token: " + err.message;
                }
            },
            async addAdvisor() {
                 this.advisorMessage = null;
                this.advisorError = null;
               try{
                   if (this.tokens.length > 0) {
                    const firstToken = this.tokens[0];
                    firstToken.advisor.push(this.newAdvisor);
                     this.advisorMessage = "Advisor added successfully!";
                    this.newAdvisor = {name: ''};
                   }else{
                       this.advisorError = "Please add a token first!";
                   }
                }catch (err) {
                    this.advisorError = "Error adding advisor: " + err.message;
                }
            }
        },
      });
    </script>
