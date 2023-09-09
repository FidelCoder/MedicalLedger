import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useNavigate } from "react-router-dom";
import Cont from './abis/Health.json';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { BiError }from "react-icons/bi";
import { FaRegAddressCard, FaUserMd, FaHospital, FaUser } from "react-icons/fa";
import { RiLockPasswordLine }from "react-icons/ri";
import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterDoctor() {
  
  const [account, setAccount] = useState();
  const [name, setName] = useState("");
  const [hospital, setHospital] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [contract, setContract] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'https://rpc.ankr.com/eth_goerli');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      // const networkId = await web3.eth.net.getId();

      // const networkData = Cont.networks[networkId];
      // if(networkData) {
        // const contractInstance = new web3.eth.Contract(Cont.abi, networkData.address);
        const contract = new web3.eth.Contract(Cont, '0x5eBc050BbB3E172CD5AdB1889237bCf1219A15Bf');

        setContract(contract);
      // } else {
      //   window.alert('Smart contract not deployed to detected network.');
      // }

      if (window.ethereum) {
        window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
        window.ethereum.on('accountsChanged', (accounts) => {
          setAccount(accounts[0]);
        });
      }
    }
    
    load();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setShowAlert(false);

    // Check if contract is initialized
    if (!contract) {
      console.error("Contract not initialized");
      setAlertMsg("Error initializing the contract. Please refresh or try again later.");
      setShowAlert(true);
      return;
    }

    try {
      const receipt = await contract.methods.add_doctor(account, name, hospital, specialization, age, password).send({ from: account });

      if (receipt.status) {
        setAlertMsg("Doctor registered successfully!");
      } else {
        setAlertMsg("Transaction failed but was included in a block.");
      }
      setShowAlert(true);
    } catch(error) {
      console.error("Error:", error);
      // Here, provide a more specific error message
      setAlertMsg("Failed to register the doctor. Reason: " + error.message);
      setShowAlert(true);
    }
  };

  return (
    <div className='RegisterDoctor'>
      <div className="RegisterDoctorContainer">
        <div className="RegisterDoctorContents">
          <center><h3 style={{fontVariant : 'small-caps', color : '#2874A6', paddingBottom : '10px'}}>Doctor Registration</h3></center>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-4 mt-4" controlId="formBasicAddress">
                <Form.Label>
                  <FaRegAddressCard size={24}/>
                  <span style={{marginLeft : '10px', fontWeight : 'bold', fontVariant : 'small-caps'}}>Ethereum Address</span>
                </Form.Label>
                <Form.Control type="text" placeholder={account} disabled/>
            </Form.Group>

            <Form.Group controlId="formBasicName">
                <Form.Label>
                  <FaUser size={24}/>
                  <span style={{marginLeft : '10px', fontWeight : 'bold', fontVariant : 'small-caps'}}>Name</span>
                </Form.Label>
                <Form.Control type="text" placeholder="Enter Name" onChange={e => setName(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicHospital">
                <Form.Label>
                  <FaHospital size={24}/>
                  <span style={{marginLeft : '10px', fontWeight : 'bold', fontVariant : 'small-caps'}}>Hospital</span>
                </Form.Label>
                <Form.Control type="text" placeholder="Enter Hospital" onChange={e => setHospital(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicSpecialization">
                <Form.Label>
                  <FaUserMd size={24}/>
                  <span style={{marginLeft : '10px', fontWeight : 'bold', fontVariant : 'small-caps'}}>Specialization</span>
                </Form.Label>
                <Form.Control type="text" placeholder="Enter Specialization" onChange={e => setSpecialization(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicAge">
                <Form.Label>
                  <FaUser size={24}/>
                  <span style={{marginLeft : '10px', fontWeight : 'bold', fontVariant : 'small-caps'}}>Age</span>
                </Form.Label>
                <Form.Control type="number" placeholder="Enter Age" onChange={e => setAge(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>
                  <RiLockPasswordLine size={24}/>
                  <span style={{marginLeft : '10px', fontWeight : 'bold', fontVariant : 'small-caps'}}>Password</span>
                </Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            
            {showAlert
              ? <Alert variant={alertMsg.includes("successfully") ? "success" : "danger"}>
                  <BiError size={20}/>
                  <span style={{marginLeft : '10px'}}>{alertMsg}</span>
                </Alert>
              : <div style={{height : '25px'}}></div>}
            
            <div className="d-grid mx-5 mt-4">
                <Button variant="primary" size="lg" type="submit">
                    Register
                </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>        
  );
}

export default RegisterDoctor;
