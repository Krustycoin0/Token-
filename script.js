new Vue({
    el: '#app',
    data: {
        tokens: [],
        advisorMessage: '',
        advisorError: '',
        tokenMessage: '',
        tokenError: ''
    },
    mounted() {
        this.getTokens();
        this.initSwiper();
    },
    methods: {
        getTokens() {
            fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
                .then(response => response.json())
                .then(data => {
                    this.tokens = data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        initSwiper() {
            const swiper = new Swiper('.mySwiper', {
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        },
        addAdvisor() {
            const advisorName = document.getElementById('advisorName').value;
            fetch('/add-advisor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ advisorName })
            })
                .then(response => response.json())
                .then(data => {
                    this.advisorMessage = data.message;
                    document.getElementById('advisor-success').style.display = 'block';
                })
                .catch(error => {
                    this.advisorError = error.message;
                    document.getElementById('advisor-error').style.display = 'block';
                });
        },
        addToken() {
            const tokenName = document.getElementById('tokenName').value;
            const tokenSymbol = document.getElementById('tokenSymbol').value;
            const tokenLogo = document.getElementById('tokenLogo').value;
            const tokenPrice = document.getElementById('tokenPrice').value;
            const tokenMarketCap = document.getElementById('tokenMarketCap').value;
            const tokenDescription = document.getElementById('tokenDescription').value;
            const isPresale = document.getElementById('isPresale').checked;
            const presaleInfo = document.getElementById('presaleInfo').value;
            fetch('/add-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tokenName,
                    tokenSymbol,
                    tokenLogo,
                    tokenPrice,
                    tokenMarketCap,
                    tokenDescription,
                    isPresale,
