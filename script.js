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
         this.user = true; // Set user to true to show the admin panel

        // Load tokens from database (example with mock data)
        this.loadTokens();

    },
    methods: {
        async loadTokens() {
           try{
           // Example of mock data like CoinBoom or Top 100
             this.tokens = [
                    { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: '$42,000', description: 'The original cryptocurrency.', advisors: ['Satoshi N.']},
                    { rank: 2, name: 'Ethereum', symbol: 'ETH', price: '$2,200', description: 'A platform for decentralized applications.', advisors: ['Vitalik B.']},
                    { rank: 3, name: 'Tether', symbol: 'USDT', price: '$1.00', description: 'A stablecoin pegged to the US dollar.' , advisors: ['John S.','Mark T.']},
                    { rank: 4, name: 'Binance Coin', symbol: 'BNB', price: '$300', description: 'The native token of Binance exchange.' , advisors: []},
                    { rank: 5, name: 'Cardano', symbol: 'ADA', price: '$0.50', description: 'A proof-of-stake blockchain platform.', advisors: ['Charles H.']},
                     { rank: 6, name: 'Ripple', symbol: 'XRP', price: '$0.60', description: 'A digital payment protocol.', advisors: []},
                     { rank: 7, name: 'Solana', symbol: 'SOL', price: '$100', description: 'A high-performance blockchain.', advisors: []},
                     { rank: 8, name: 'Polkadot', symbol: 'DOT', price: '$7.00', description: 'A multichain network.', advisors: []},
                     { rank: 9, name: 'Dogecoin', symbol: 'DOGE', price: '$0.08', description: 'A meme-inspired cryptocurrency.', advisors: []},
                     { rank: 10, name: 'Litecoin', symbol: 'LTC', price: '$70', description: 'A peer-to-peer internet currency.', advisors: []},
                     { rank: 11, name: 'Shiba Inu', symbol: 'SHIB', price: '$0.00001', description: 'A meme token.', advisors: []},
                ];
               this.loadingTokens = false;
           }catch(error){
              this.error = error.message;
               this.loadingTokens = false;
                console.log('Load Tokens Error: ', error)
          }
        },
         async addToken(){
           try {
              const tokenToAdd = {...this.newToken}
              tokenToAdd.rank = this.tokens.length + 1;
              this.tokens.push(tokenToAdd)
               this.tokenMessage = 'Token Added Successfully'
                this.newToken = {
                    name: null,
                    symbol: null,
                    description: null,
                   isPresale: false,
                    presaleInfo: null
                };
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
            const advisorToAdd = {...this.newAdvisor};
            if (this.tokens.length > 0) {
                 this.tokens[0].advisors.push(advisorToAdd.name);
                this.advisorMessage = "Advisor Added Successfully";
                this.newAdvisor = {name: null};
            }else{
                 this.advisorError = "Please add a token first"
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
