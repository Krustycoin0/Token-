   const tokenList = document.getElementById('token-list');
        const addTokenForm = document.getElementById('add-token-form');
        const tokenSuccess = document.getElementById('token-success');
        const tokenError = document.getElementById('token-error');

       addTokenForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const tokenName = document.getElementById('tokenName').value;
            const tokenSymbol = document.getElementById('tokenSymbol').value;
            const tokenLogo = document.getElementById('tokenLogo').value;
            const tokenPrice = document.getElementById('tokenPrice').value;
            const tokenMarketCap = document.getElementById('tokenMarketCap').value;
            const tokenDescription = document.getElementById('tokenDescription').value;
            const isPresale = document.getElementById('isPresale').checked;
            const presaleInfo = document.getElementById('presaleInfo').value;

            try {
                 if (typeof window.ethereum !== 'undefined') {
                    const web3 = new Web3(window.ethereum);
                      await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accounts = await web3.eth.getAccounts();
                    const walletAddress = '0xC6927e8e6A8B966fC3cBDfFB639c9db459A8C5D5';
                    const paymentAmount = web3.utils.toWei('0.01', 'ether');

                    const txCount = await web3.eth.getTransactionCount(accounts[0]);
                    const tx = {
                        from: accounts[0],
                        to: walletAddress,
                        value: paymentAmount,
                         gas: '200000',
                        gasPrice: web3.utils.toWei('20', 'gwei'),
                        nonce: txCount
                    };

                    const signedTx = await web3.eth.accounts.signTransaction(tx, accounts[0]);
                    const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

                     console.log(`Transaction hash: ${txHash.transactionHash}`);
                     // Add token to list
                  const tokenHTML = `
                            <div class="bg-white rounded-lg p-4 shadow-md">
                                <h2 class="text-2xl font-bold mb-4">${tokenName}</h2>
                                <p>Symbol: ${tokenSymbol}</p>
                                <p>Logo: <img src="${tokenLogo}" alt="${tokenName} Logo" class="w-16 h-16 rounded-full" ></p>
                                <p>Price: ${tokenPrice}</p>
                                <p>Market Cap: ${tokenMarketCap}</p>
                                <p>Description: ${tokenDescription}</p>
                                ${isPresale ? `<p>Presale: Yes</p>` : ''}
                                ${presaleInfo ? `<p>Presale Info: ${presaleInfo}</p>` : ''}
                            </div>
                        `;

                        tokenList.innerHTML += tokenHTML;

                        tokenSuccess.style.display = 'block';
                         tokenSuccess.innerHTML = `Token added successfully!`;
                        setTimeout(() => {
                            tokenSuccess.style.display = 'none';
                           }, 3000);

                 } else {
                        tokenError.style.display = 'block';
                        tokenError.innerHTML = 'Metamask is not present!';
                          setTimeout(() => {
                            tokenError.style.display = 'none';
                           }, 3000);
                 }
            } catch (error) {
                console.error(error);
                tokenError.style.display = 'block';
                tokenError.innerHTML = `Error adding token: ${error.message}`;
                 setTimeout(() => {
                            tokenError.style.display = 'none';
                          }, 3000);
            }
        });
