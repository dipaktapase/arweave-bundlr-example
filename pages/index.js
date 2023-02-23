
import BigNumber from 'bignumber.js'
import { useContext, useState } from 'react'
import { MainContext } from '../context'

export default function Home() {
  const [file, setFile] = useState()
  const [image, setImage] = useState()
  const [URI, setURI] = useState()
  const [amount, setAmount] = useState()
  const { bundlrInstance, initialiseBundlr, balance, fetchBalance } = useContext(MainContext)
  
  async function initialize() {
    initialiseBundlr()
  }

  async function fundWallet() {
    if (!amount) return
    const amountParsed = parseInput(amount)
    let response = await bundlrInstance.fund(amountParsed)
    console.log('Wallet funded: ', response)
    fetchBalance()
  }

  function parseInput (input) {
    const conv = new BigNumber(input).multipliedBy(bundlrInstance.currencyConfig.base[1])
    if (conv.isLessThan(1)) {
      console.log('error: value too small')
      return
    } else {
      return conv
    }
  }

  return (
    <div style={containerStyle}>
      {
        !balance && <button onClick={initialize}>Initialize</button>
      }
      {
        balance && (
          <div>
            <h3>Balance: {balance}</h3>
            <div style={{ padding: '20px 0px'}}>
              <input 
                placeholder='Amount to fund wallet' 
                onChange={e => setAmount(e.target.value)} />
              <button onClick={fundWallet}>Fund Wallet</button>
            </div>

          </div>
        )
      }
    </div>
  )
}

const containerStyle = {
  padding: '100px 20px'
}