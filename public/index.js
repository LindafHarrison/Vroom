import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Search from './components/search';
import ManufacturerDetails from './components/manufacturerDetails';
import Manufacturers from './components/manufacturers';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json')
      .then((res) => res.json())
      .then(res => {
        let manufacturers = [];
        res.Results.forEach(carMake => {
          if (carMake.Mfr_CommonName) manufacturers.push(carMake.Mfr_CommonName)
          else manufacturers.push(carMake.Mfr_Name)
        });
        this.setState({
          manufacturers: manufacturers
        })
      })
  }

  render() {
    const { manufacturers, input, clicked, display, addresses, lastCarClicked } = this.state;
    let manufacturersFilter = manufacturers && input && clicked ?
      manufacturers.filter(manufacturer => {
        return manufacturer.toLowerCase().includes(input.toLowerCase())
      }) : []

    let showModal = (text) => {

      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetManufacturerDetails/${text}?format=json`)
        .then(response => response.json())
        .then(res => {
          let addresses = res.Results.map(dealership => {
            if (dealership.Address2) return dealership.Address + " " + dealership.Address2
            else return dealership.Address
          })
          this.setState({ display: "block", addresses: addresses, lastCarClicked: text })
        })
    }

    let closeModal = () => {
      this.setState({ display: "none" })
    }

    let manufacturersDiv = input ? manufacturersFilter.map((manufacturer, i) => (
      <Manufacturers key={i} manufacturer={manufacturer} select={text => showModal(text)} />
    )) : []

    return (
      <div>
        <div id="header" >
          <img id="header" src="../images/car.jpg" />
          <img className="logo" src="../images/logo.png" />
          <Search input={input} clicked={() => this.setState({ clicked: true })}
            onTextChange={text => this.setState({ input: text, clicked: false })} />
        </div>
        <div className="grid-container" >
          {manufacturersDiv}
          <ManufacturerDetails display={this.state.display} addresses={addresses} closeModal={closeModal} lastCarClicked={lastCarClicked} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));