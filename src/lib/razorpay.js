const KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_demo'

export function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return }
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

export function initiatePayment({ amount, orderId, customerName, customerEmail, onSuccess, onFailure }) {
  const options = {
    key: KEY,
    amount: amount * 100,
    currency: 'INR',
    name: 'VELORA',
    description: 'Order #' + orderId,
    image: '/favicon.svg',
    handler: (res) => onSuccess(res),
    prefill: { name: customerName, email: customerEmail },
    theme: { color: '#a855f7' },
    modal: { ondismiss: () => onFailure && onFailure() },
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}
