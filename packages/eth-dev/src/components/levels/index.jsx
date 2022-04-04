import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connectController as wrapGlobalGameData } from '../gameItems'
import { Background, QRPunkBlockie } from '../gameItems/components'

import TemplateLevel from './TemplateLevel'
import Intro from './Intro'
import ScaffoldEthOverview from './ScaffoldEthOverview'
import UnderflowBug from './UnderflowBug'
import SetupLocalNetwork from './SetupLocalNetwork'
import CreateWallet from './CreateWallet'
import SetupMetamask from './SetupMetamask'
import GamblingContract from './GamblingContract'
import Multisig from './Multisig'
import DecentralizedExchange from './DecentralizedExchange'
import NFTStore from './NFTStore'
import DecentralizedStakingApp from './DecentralizedStakingApp'
import TokenVendor from './TokenVendor'
import DAOHack from './DAOHack'
import FlashLoans from './FlashLoans'
import ERC20 from './ERC20'
import BondingCurves from './BondingCurves'
import ENS from './ENS'
import UpgradableContracts from './UpgradableContracts'

const Levels = ({ levelContainer: { currentLevel }, globalGameActions, loadWeb3Modal }) => {
  const setInitialLevel = levelId => {
    console.log(`setting initial level to: ${levelId}`)
    globalGameActions.level.setCurrentLevel({ levelId })
  }

  // TODO:
  const [wallet, setWallet] = useState()

  const setupGame = () => {
    setInitialLevel('Intro')
  }

  useEffect(() => {
    setupGame()
  }, [])

  const [showMessageNotification, setShowMessageNotification] = useState(false)
  const [_showMessageNotificationInXSeconds, showMessageNotificationInXSeconds] = useState(null)

  const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000))

  useEffect(() => {
    async function exec() {
      await sleep(showMessageNotificationInXSeconds)
      setShowMessageNotification(true)
    }
    exec()
  }, [_showMessageNotificationInXSeconds])

  return (
    <>
      <Background />

      {wallet && wallet.address && (
        <div style={{ position: 'absolute', right: 100, top: -100, zIndex: 1 }}>
          <QRPunkBlockie withQr={false} address={wallet && wallet.address} scale={1} />
        </div>
      )}

      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Intro />
          </Route>
          <Route path='/scaffold-eth-overview'>
            <ScaffoldEthOverview />
          </Route>
          <Route path='/underflow-bug'>
            <UnderflowBug />
          </Route>
          <Route path='/setup-local-network'>
            <SetupLocalNetwork />
          </Route>
          <Route path='/create-wallet'>
            <CreateWallet />
          </Route>
          <Route path='/setup-metamask'>
            <SetupMetamask />
          </Route>
          <Route path='/insecure-gambling-contract'>
            <GamblingContract />
          </Route>
          <Route path='/multisig'>
            <Multisig />
          </Route>
          <Route path='/decentralized-exchange'>
            <DecentralizedExchange />
          </Route>
          <Route path='/nft-store'>
            <NFTStore />
          </Route>
          <Route path='/decentralized-staking-app'>
            <DecentralizedStakingApp />
          </Route>
          <Route path='/token-vendor'>
            <TokenVendor />
          </Route>
          <Route path='/dao-hack'>
            <DAOHack />
          </Route>
          <Route path='/flash-loans'>
            <FlashLoans />
          </Route>
          <Route path='/erc20'>
            <ERC20 />
          </Route>
          <Route path='/bonding-curves'>
            <BondingCurves />
          </Route>
          <Route path='/ens'>
            <ENS />
          </Route>
          <Route path='/upgradable-contracts'>
            <UpgradableContracts />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default wrapGlobalGameData(Levels)
