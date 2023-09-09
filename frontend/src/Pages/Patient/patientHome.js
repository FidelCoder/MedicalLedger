import { useEffect, useState } from 'react';
import PatientSideBar from "../../Components/patientSideBar";
import '../container.css'

import Web3 from 'web3';
import Cont from '../../abis/Health.json'

function Patient() {

    const [account, setAccount] = useState();
    const [name, setName] = useState("");    

    useEffect(() => {
      async function load() {
        const web3 = new Web3(Web3.givenProvider || 'https://rpc.ankr.com/eth_goerli');
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        // const networkData = Cont.networks[networkId];
        // const networkData = '5';

        // if(networkData) {
          const contract = new web3.eth.Contract(Cont, '0x5eBc050BbB3E172CD5AdB1889237bCf1219A15Bf');
          const patient = await contract.methods.get_patient(accounts[0]).call({ from: accounts[0] });
          setName(patient[0]);
        // } else {
        //   window.alert('Smart contract not deployed to detected network.')
        // }
      }
      
      load();
     }, []);

    return (
      <>
        <PatientSideBar name={name}/>
        <div className="main-container">
          <div className="main-body">
            <h1>Patient Home</h1>
            <div>Hello {name} - {account}</div>
          </div>
        </div>
      </>
    );
}
  
export default Patient;