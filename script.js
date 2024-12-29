 const app = new Vue({
            el: '#app',
            data: {
                tokens: [],
                 advisors: []
            },
             mounted() {
                 this.getTokens();
                 this.getAdvisors();
                this.swiper = new Swiper('.mySwiper', {
                    pagination: {
                        el: '.swiper-pagination',
                    },
                 });
              },
               methods: {
                    getTokens() {
                     // Mock token data with actual logo URLs
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
                                presale: false,
                                presaleInfo: null,
                                promoted: true,
                                advisors: []
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
                                presale: false,
                                 presaleInfo: null,
                                promoted: true,
                                advisors: []
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
                                presale: false,
                                  presaleInfo: null,
                                  promoted: false,
                                advisors: []
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
                                presale: false,
                                  presaleInfo: null,
                                promoted: false,
                                advisors: []
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
                                presale: false,
                                presaleInfo: null,
                                 promoted: false,
                                advisors: []
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
                                 presale: false,
                                 presaleInfo: null,
                                 promoted: false,
                                advisors: []
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
                                 presale: false,
                                  presaleInfo: null,
                                  promoted: false,
                                  advisors: []
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
                                 presale: false,
                                  presaleInfo: null,
                                  promoted: false,
                                   advisors: []
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
                                  presale: false,
                                  presaleInfo: null,
                                promoted: false,
                                advisors: []
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
                                 presale: false,
                                  presaleInfo: null,
                                  promoted: false,
                                advisors: []
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
                                   presale: false,
                                    presaleInfo: null,
                                    promoted: false,
                                 advisors: []
                            }
                    ];
                     this.renderTokenList();
                },
                   getAdvisors() {
                       axios.get('https://api.example.com/advisors')
                        .then(response => {
                            this.advisors = response.data;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                   },
                renderTokenList() {
                    const tokenList = document.getElementById('token-list');
                    tokenList.innerHTML = '';
                    const promotedTokens = this.tokens.filter(token => token.promoted);
                     const nonPromotedTokens = this.tokens.filter(token => !token.promoted);
                      const promotedTokenSection = document.getElementById('promoted-tokens');
                       promotedTokenSection.innerHTML = '';

                    promotedTokens.forEach(token => {
                        const card = document.createElement('div');
                        card.classList.add('token-card');
                        card.innerHTML = `
                            <img src="${token.logo}" alt="${token.name} Logo" class="w-16 h-16 rounded-full mb-4">
                            <h3 class="text-lg font-bold">#${token.rank} ${token.name}</h3>
                            <p>Symbol: ${token.symbol}</p>
                            <p>Price: $${token.price}</p>
                            <p>Market Cap: $${token.marketCap}</p>
                            <p>Description: ${token.description}</p>
                             <p>Presale: ${token.presale ? "Yes": "No"} ${token.presaleInfo ? ' - '+token.presaleInfo : ''}</p>
                            <div v-if="token.advisors && token.advisors.length > 0">
                                <h4 class="font-semibold mt-2">Advisors</h4>
                                <ul>
                                    ${token.advisors.map(advisor => `<li>- ${advisor.name}</li>`).join("")}
                                </ul>
                            </div>
                            `;
                        promotedTokenSection.appendChild(card);
                    });
                     nonPromotedTokens.forEach(token => {
                        const card = document.createElement('div');
                         card.classList.add('token-card');
                        card.innerHTML = `
                            <img src="${token.logo}" alt="${token.name} Logo" class="w-16 h-16 rounded-full mb-4">
                            <h3 class="text-lg font-bold">#${token.rank} ${token.name}</h3>
                            <p>Symbol: ${token.symbol}</p>
                            <p>Price: $${token.price}</p>
                             <p>Market Cap: $${token.marketCap}</p>
                            <p>Description: ${token.description}</p>
                              <p>Presale: ${token.presale ? "Yes": "No"} ${token.presaleInfo ? ' - '+token.presaleInfo : ''}</p>
                            <div v-if="token.advisors && token.advisors.length > 0">
                                <h4 class="font-semibold mt-2">Advisors</h4>
                                <ul>
                                      ${token.advisors.map(advisor => `<li>- ${advisor.name}</li>`).join("")}
                                </ul>
                            </div>
                            `;
                         tokenList.appendChild(card);
                    });
                },
                  addToken(event) {
                        event.preventDefault();
                        const tokenName = document.getElementById('tokenName').value;
                        const tokenSymbol = document.getElementById('tokenSymbol').value;
                        const tokenLogo = document.getElementById('tokenLogo').value;
                        const tokenPrice = document.getElementById('tokenPrice').value;
                        const tokenMarketCap = document.getElementById('tokenMarketCap').value;
                        const tokenDescription = document.getElementById('tokenDescription').value;
                        const isPresale = document.getElementById('isPresale').checked;
                        const presaleInfo = document.getElementById('presaleInfo').value;
                        this.tokens.push({
                            id: this.tokens.length + 1,
                            rank: this.tokens.length + 1,
                            name: tokenName,
                            symbol: tokenSymbol,
                            logo: tokenLogo,
                            price: tokenPrice,
                           marketCap: tokenMarketCap,
                           description: tokenDescription,
                            presale: isPresale,
                           presaleInfo: presaleInfo,
                            promoted: false,
                            advisors: []
                         });
                          document.getElementById('token-success').style.display = 'block';
                         document.getElementById('token-message').innerText = 'Token added successfully!';
                           document.getElementById('add-token-form').reset();
                           this.renderTokenList();
                         setTimeout(() => {
                               document.getElementById('token-success').style.display = 'none';
                          }, 3000);
                      },
                        addAdvisor(event) {
                           event.preventDefault();
                         const advisorName = document.getElementById('advisorName').value;
                         if(this.tokens.length > 0){
                             const firstToken = this.tokens[0];
                             if(firstToken.advisors){
                               firstToken.advisors.push({id: firstToken.advisors.length +1, name:advisorName});
                             }else {
                                 firstToken.advisors = [{id: 1, name:advisorName}];
                              }
                             document.getElementById('advisor-success').style.display = 'block';
                             document.getElementById('advisor-message').innerText = 'Advisor added successfully!';
                           document.getElementById('add-advisor-form').reset();
                            this.renderTokenList();
                            setTimeout(() => {
                               document.getElementById('advisor-success').style.display = 'none';
                          }, 3000);
                         }else{
                                document.getElementById('advisor-error').style.display = 'block';
                              document.getElementById('advisor-error-message').innerText = 'Please add a token first';
                               setTimeout(() => {
                               document.getElementById('advisor-error').style.display = 'none';
                          }, 3000);
                          }


                }
        });
    </script>
