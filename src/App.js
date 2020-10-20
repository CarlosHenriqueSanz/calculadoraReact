import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Display(props) {
  return (
    <div className="App">
        <p>{props.value}</p>
    </div>
  );
}

function Button(props) {
  return (

  <button onClick={props.click}>{props.text}</button>
  );
}

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentOperand: "",
      previous:'',
      operat:"",
      operation:" ",
      listaMem: [],
      ponto: false
    };
    this.addNumber = this.addNumber.bind(this);
    this.compute = this.compute.bind(this);
    this.igual = this.igual.bind(this);
    this.apaga= this.apaga.bind(this);
    }

    addNumber(number) { // adiciona o numero com o cuidado de nao ter dois pontos
      const { ponto,currentOperand } = this.state
      if (number !== ".") {
        this.setState({
          currentOperand: this.state.currentOperand + number
        })
      } else if (number === "." & ponto===false) {
        this.setState({
          currentOperand: this.state.currentOperand + number,
          ponto: true
        })
      } else if (number === "." & ponto===true) {
        this.setState({
          currentOperand: this.state.currentOperand,
        })
      }
    }

      apaga() { // apaga os valores do display
        this.setState(
          {
            currentOperand: '',
            previous:'',
            operation:"",
            ponto: false
  
          }
        );
      }

    igual() { // faz a matematica 
      this.setState( (state) =>{
          let ig;
          const {previous, currentOperand, operation} = state;
          const prev = parseFloat(previous);
          const cur = parseFloat(currentOperand);
          switch(operation) {
            case "+":
              ig=prev+cur;
              break;
            case "-":
              ig=prev-cur;
              break;
            case "/":
              ig=prev/cur;
              break;
            case "*":
              ig=prev*cur;
              break;
            default:
              return;
          }
          return{
            currentOperand: ig,
            previous:'',
            operation:"",
          }
        }
      );
      this.setState(
        {
          ponto: false
        }
        );
    }
  
    compute(num_at,operat) {
      this.setState(
        {
          currentOperand: '',
          previous:num_at+operat,
          operation:operat ,
          ponto: false
        }
        );
      }

      MS(){ // salva o valor na memoria 
        this.setState((state) => {
          const {currentOperand, listaMem} = state;
          const anterior = listaMem.slice();
          const atual = parseFloat(currentOperand);
          anterior.unshift(atual)
          return{
            listaMem: anterior
          }
        }
        );
      }

      MR(){ //retorna o ultimo valor adicionado na memoria  
        this.setState((state) => {
          const {listaMem} = state;
          let ultimo;
          ultimo = listaMem.slice(0)[0];
          return{
            currentOperand: parseFloat(ultimo)
          }
        }
        );
      }

      MC(){ //Limpa a memoria  
        this.setState((state) => {
          const {listaMem} = state;
          return{
            listaMem: []
          }
        }
        );
      }

      Msoma(){ // soma com o ultimo valor da memoria  
        this.setState((state) => {
          const {currentOperand,listaMem} = state;
          let novo;
          const list = listaMem.slice();
          novo = listaMem.slice(0)[0] + parseFloat(currentOperand);
          list.shift();
          list.unshift(novo);
          return{
            listaMem: list
          }
        }
        );
      }

      MCmemoria(elemento){
        this.setState((state) => {
          const {listaMem} = state;
          let pilhaN;
          pilhaN = listaMem.slice()
          pilhaN.splice(pilhaN.indexOf(elemento), 1);
          return{
            listaMem: pilhaN
          }
        }
        );
      }

      MRmemoria(elemento){ //retorna o valor adicionado na memoria  
        this.setState((state) => {
          return{
            currentOperand: parseFloat(elemento)
          }
        }
        );
      }


  render() {
  return (

    <div className="App">
      <div className="Titulo">
        Minha primeira calculadora 
      </div>
      <h1><Display value={this.state.previous}/></h1>
      <h1><Display value={this.state.currentOperand}/></h1>

      <div className="Bot">
      
         <Button text="7" click={() => this.addNumber('7')}/>
        <Button text="8" click={() => this.addNumber('8')}/>
        <Button text="9" click={() => this.addNumber('9')}/>
        <Button text="*" click={() => this.compute(this.state.currentOperand,'*')}/>

      </div>

      <div className="Bot">
         <Button text="4" click={() => this.addNumber('4')}/>
        <Button text="5" click={() => this.addNumber('5')}/>
        <Button text="6" click={() => this.addNumber('6')}/>
        <Button text="-" click={() => this.compute(this.state.currentOperand,'-')}/>
      </div>

      <div className="Bot">
          <Button text="1" click={() => this.addNumber('1')}/>  
         <Button text="2" click={() => this.addNumber('2')}/>
         <Button text="3" click={() => this.addNumber('3')}/>
         <Button text="+" click={() => this.compute(this.state.currentOperand,'+')} />
      </div>

      <div className="Bot">
        <Button text="0" click={() => this.addNumber('0')}/>
        <Button text="." click={() => this.addNumber(".")}/>
        <Button text="=" click={() => this.igual(this.state.currentOperand,this.state.previous,this.state.operation)}/>
        <Button text="/" click={() => this.compute(this.state.currentOperand,'/')}/>

      </div>
      <Button text="C" click={() => this.apaga()}/>
      <Button text="MC" click={() => this.MC()}/>
      <Button text="MR" click={() => this.MR()}/>
      <Button text="M+" click={() => this.Msoma()}/>
      <Button text="MS" click={() => this.MS()}/>
      <p>  Memória </p>
      {
                this.state.listaMem.map(
                  (elemento) =>
                  <div> 
                    {elemento} <Button text="MC" click={() => this.MCmemoria(elemento)}/> 
                          <Button text="MR" click={() => this.MRmemoria(elemento)}/> 
                  </div>
                )
      }
    </div>
  );
  }
}

export default App;
