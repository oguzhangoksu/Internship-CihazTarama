import axios from 'axios';
import './index.css';
import { useEffect, useState } from 'react';
import CardLink from './CardLink';
import Enjeksiyon2 from './Enjeksiyon2';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import Enjeksiyon1 from './Enjeksiyon1';
import Graph from './Graph';


var url = `http://localhost:3005`
var url2 = `http://localhost:3005/degerler`


function App() {
  const [devices, setDevices] = useState([]);//anlık gelen
  const [sayi, setSayi] = useState(0);
  const [cpu, setCpu] = useState([]);
  const [isimler, setIsimler] = useState([])
  const [ram, setRam] = useState([]);
  const [wifi, setWifi] = useState([]);
  const [disk, setDisk] = useState([]);
  const [degerler, setDegerler] = useState([]);//bütün değerler

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await axios.post(url);
        const response2 = await axios.post(url2);
        setDevices(response.data.makineList)
        setDegerler(response2.data.makineList)
        setSayi(response.data.makineList.length)
      }
      catch (err) {
        console.log("Error:" + err.message)
      }
    }
    fetchPosts()
  }, []);

  useEffect(() => {

    divide(devices)

  }, [devices])
  


  function divide(devices) {
    var _cpu = [];
    var _isimler = [];
    var _ram = [];
    var _wifi = [];
    var _disk = [];

    devices.map((makineListItem) => {
      _cpu.push(makineListItem.cpuSicaklik)
      _isimler.push(makineListItem.makineAdi)
      _ram.push(makineListItem.ramMiktari)
      _wifi.push(makineListItem.wifiData)
      _disk.push(makineListItem.diskKapasite)
    });
    setCpu(_cpu);
    setIsimler(_isimler);
    setRam(_ram);
    setWifi(_wifi);
    setDisk(_disk);
   
  }

  
 


  return (
    <div >
      <BrowserRouter>

        <Routes>
          <Route exact path="/" element={<CardLink cpu={cpu} isimler={isimler} sayi={sayi} ram={ram} wifi={wifi} disk={disk} />}></Route>
          <Route exact path="/:name" element={<Graph degerler={degerler} devices={devices}/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
