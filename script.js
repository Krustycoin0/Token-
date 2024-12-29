    const tokenList = document.getElementById('token-list');
        const addTokenForm = document.getElementById('add-token-form');
        const tokenSuccess = document.getElementById('token-success');
        const tokenError = document.getElementById('token-error');
        const promotedTokenSection = document.getElementById('promoted-tokens');


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
                    const tokenData = {
                         id: Date.now(), // Simple ID for mock
                        rank: tokenList.children.length + 1,
                        name: tokenName,
                        symbol: tokenSymbol,
                         logo: tokenLogo,
                        price: tokenPrice,
                        marketCap: tokenMarketCap,
                         description: tokenDescription,
                         presale: isPresale,
                         presaleInfo: presaleInfo
                        };
                    // Add token to list
                const card = document.createElement('div');
                card.classList.add('token-card');
                card.innerHTML = `
                     <img src="${tokenLogo}" alt="${tokenName} Logo" class="w-16 h-16 rounded-full mb-4">
                      <h3 class="text-lg font-bold">#${tokenData.rank} ${tokenName}</h3>
                      <p>Symbol: ${tokenSymbol}</p>
                      <p>Price: $${tokenPrice}</p>
                     <p>Market Cap: $${tokenMarketCap}</p>
                      <p>Description: ${tokenDescription}</p>
                       <p>Presale: ${tokenData.presale ? "Yes": "No"} ${tokenData.presaleInfo ? ' - '+tokenData.presaleInfo : ''}</p>
                  `;
                  if (tokenList.children.length < 3) {
                        promotedTokenSection.appendChild(card);
                   } else {
                      tokenList.appendChild(card)
                   }


                        tokenSuccess.style.display = 'block';
                         tokenSuccess.innerHTML = `Token added successfully!`;
                        setTimeout(() => {
                            tokenSuccess.style.display = 'none';
                           }, 3000);
                }
                else {
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
