import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useNavigate } from "react-router-dom";
import Cont from '../../abis/Health.json';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { BiError } from "react-icons/bi";
import 'bootstrap/dist/css/bootstrap.min.css';

function PatientRegister() {
  
    const [account, setAccount] = useState("");
    const [name, setName] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // New state
    const [contract, setContract] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            const web3 = new Web3(Web3.givenProvider || 'https://rpc.ankr.com/eth_goerli');
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);

            const networkId = '5';
            const contract = new web3.eth.Contract(Cont, '0x5eBc050BbB3E172CD5AdB1889237bCf1219A15Bf');
            setContract(contract);
        }
        
        load();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAlert(false);

        if (password !== confirmPassword) {
            setAlertMsg("Passwords do not match!");
            setShowAlert(true);
            return;
        }

        try {
            await contract.methods.add_patient(aadhar, name, email, age, password).send({ from: account });
            setAlertMsg("Patient registration successful!");
            setShowAlert(true);
        } catch(err) {
            console.error("Error registering patient: ", err);
            setAlertMsg("Error registering patient. Please try again.");
            setShowAlert(true);
        }
    }

    return (
        <div className='Register'>
            <div className="RegisterContainer">
                <div className="RegisterContents">
                    <center>
                        <h3 style={{fontVariant : 'small-caps', color : '#2874A6', paddingBottom : '10px'}}>Patient Registration</h3>
                    </center>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formWalletAddress">
                            <Form.Label>Wallet Address</Form.Label>
                            <Form.Control type="text" placeholder="Your wallet address" value={account} disabled />
                        </Form.Group>

                        <Form.Group controlId="formBasicAadhar">
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Aadhar number" value={aadhar} onChange={e => setAadhar(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Enter age" value={age} onChange={e => setAge(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword"> {/* New form group for Confirm Password */}
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm password" 
                                value={confirmPassword} 
                                onChange={e => setConfirmPassword(e.target.value)} 
                                required
                            />
                        </Form.Group>

                        {showAlert?
                        <Alert variant="danger"><BiError size={20}/><span style={{marginLeft : '10px'}}>{alertMsg}</span></Alert>
                        :
                        <div style={{height : '25px'}}></div>}
                        
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

export default PatientRegister;
