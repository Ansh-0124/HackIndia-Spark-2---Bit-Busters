// wallet.js - Handles simulated Web3 Wallet connections for KalaGhar

document.addEventListener('DOMContentLoaded', () => {
    // Check if wallet is already connected (simulated via localStorage)
    const isConnected = localStorage.getItem('walletConnected') === 'true';
    const walletAddress = localStorage.getItem('walletAddress');
    
    updateWalletUI(isConnected, walletAddress);

    // Attach event listeners to all 'Connect Wallet' buttons
    const connectBtns = document.querySelectorAll('.connect-wallet-btn');
    connectBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            if (isConnected) {
                // Disconnect flow
                localStorage.removeItem('walletConnected');
                localStorage.removeItem('walletAddress');
                updateWalletUI(false, null);
                
                // If on profile page, redirect home
                if(window.location.pathname.includes('profile.html')) {
                    window.location.href = 'index.html';
                }
            } else {
                // Simulate MetaMask connection delay
                btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Connecting...';
                
                setTimeout(() => {
                    // Generate a random simulated eth address
                    const randomAddress = '0x' + Math.random().toString(16).substr(2, 10) + '...' + Math.random().toString(16).substr(2, 4);
                    
                    localStorage.setItem('walletConnected', 'true');
                    localStorage.setItem('walletAddress', randomAddress);
                    
                    updateWalletUI(true, randomAddress);
                }, 1000);
            }
        });
    });
});

function updateWalletUI(isConnected, address) {
    const connectBtns = document.querySelectorAll('.connect-wallet-btn');
    
    connectBtns.forEach(btn => {
        if (isConnected) {
            btn.innerHTML = `<i class="fas fa-wallet mr-2"></i> ${address}`;
            btn.classList.add('bg-green-600', 'hover:bg-red-600');
            btn.classList.remove('btn-primary');
            
            // On hover, show disconnect
            btn.addEventListener('mouseenter', () => {
                if(localStorage.getItem('walletConnected') === 'true') {
                    btn.innerHTML = `<i class="fas fa-sign-out-alt mr-2"></i> Disconnect`;
                }
            });
            btn.addEventListener('mouseleave', () => {
                if(localStorage.getItem('walletConnected') === 'true') {
                    btn.innerHTML = `<i class="fas fa-wallet mr-2"></i> ${localStorage.getItem('walletAddress')}`;
                }
            });
            
            // Show protected nav items
            const protectedItems = document.querySelectorAll('.protected-nav');
            protectedItems.forEach(item => item.classList.remove('hidden'));
            
        } else {
            btn.innerHTML = `Connect Wallet`;
            btn.classList.remove('bg-green-600', 'hover:bg-red-600');
            btn.classList.add('btn-primary');
            
            // Remove hover listeners safely by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            // Reattach main click listener
            newBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                newBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Connecting...';
                setTimeout(() => {
                    const randomAddress = '0x' + Math.random().toString(16).substr(2, 10) + '...' + Math.random().toString(16).substr(2, 4);
                    localStorage.setItem('walletConnected', 'true');
                    localStorage.setItem('walletAddress', randomAddress);
                    updateWalletUI(true, randomAddress);
                }, 1000);
            });
            
            // Hide protected nav items
            const protectedItems = document.querySelectorAll('.protected-nav');
            protectedItems.forEach(item => item.classList.add('hidden'));
        }
    });
}
