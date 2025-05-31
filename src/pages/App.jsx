import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    valor_apartamento: '',
    entrada: '',
    renda_familiar: '',
    cotista_fgts: false,
    possui_dependentes: false,
    possui_saldo_fgts: false,
    saldo_fgts: 0, // Add this new property
    taxa_juros_anual: '',
    prazo_anos: 10,
    email: '',
    telefone: '',
    concorda_termos: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [parcelaMensal, setParcelaMensal] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === 'sim'
    }));
  };

  const calcularParcela = () => {
    const valorImovel = parseFloat(formData.valor_apartamento || 0);
    const entrada = parseFloat(formData.entrada || 0);
    const fgtsUsado = formData.cotista_fgts ? 20000 : 0; // Simplified for CLT
    const valorFinanciado = valorImovel - entrada - fgtsUsado;

    const prazo = parseInt(formData.prazo_anos || 0);
    const taxaAnual = parseFloat(formData.taxa_juros_anual || 9);
    const taxaMensal = taxaAnual / 100 / 12;

    if (valorFinanciado <= 0 || prazo <= 0 || taxaMensal <= 0) return 0;

    const parcela = valorFinanciado * taxaMensal / (1 - Math.pow(1 + taxaMensal, -prazo));
    return parcela;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parcela = calcularParcela();
    setParcelaMensal(parcela);
    setIsSubmitted(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value || 0);
  };

  return (
    <div className="simulator-container">
      <div className="simulator-card">
        <h1 className="handwritten-title">Simulador minha casa minha vida</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            {/* Valor do imóvel */}
            <div className="form-group">
              <label htmlFor="valor_apartamento">Valor do Imóvel aproximado</label>
              <input
                type="number"
                id="valor_apartamento"
                name="valor_apartamento"
                value={formData.valor_apartamento}
                onChange={handleChange}
                placeholder=""
                required
                min="0"
                step="0.01"
                className="simple-input"
              />
            </div>

            {/* Entrada */}
            <div className="form-group">
              <label htmlFor="entrada">Valor da Entrada</label>
              <input
                type="number"
                id="entrada"
                name="entrada"
                value={formData.entrada}
                onChange={handleChange}
                placeholder=""
                required
                min="0"
                step="0.01"
                className="simple-input"
              />
            </div>
          </div>

          <div className="form-row">
            {/* Renda familiar */}
            <div className="form-group">
              <label htmlFor="renda_familiar">Renda Familiar Mensal</label>
              <select
                id="renda_familiar"
                name="renda_familiar"
                value={formData.renda_familiar}
                onChange={(e) => {
                  const value = e.target.value;
                  let taxa = '4.25%';

                  if (value === 'até_2850') taxa = "4.25%";
                  else if (value === '2850_4700') taxa = "4.5%";
                  else if (value === '4700_8000') taxa = "5.5%";
                  else if (value === '8000_12000') taxa = "7.16%";

                  setFormData({
                    ...formData,
                    renda_familiar: value,
                    taxa_juros_anual: taxa, // Corrected from taxa_juros to taxa_juros_anual
                  });
                }}
                required
                className="simple-input"
              >
                <option value="até_2850">Até R$ 2.850,00</option>
                <option value="2850_4700">R$ 2.850,01 a R$ 4.700,00</option>
                <option value="4700_8000">R$ 4.700,01 a R$ 8.000,00</option>
                <option value="8000_12000">R$ 8.000,01 a R$ 12.000,00</option>
              </select>
            </div>

            {/* Taxa de juros */}
            <div className="form-group">
              <label htmlFor="taxa_juros_anual">Taxa de juros anual</label>
              <input
                type="text"
                id="taxa_juros_anual"
                name="taxa_juros_anual"
                value={formData.taxa_juros_anual}
                onChange={handleChange}
                placeholder=""
                className="simple-input"
                disabled
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prazo_anos">Prazo (Anos)</label>
              <input
                type="number"
                id="prazo_anos"
                name="prazo_anos"
                value={formData.prazo_anos}
                onChange={handleChange}
                placeholder=""
                min="10"
                max="420"
                step="1"
                className="simple-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="saldo_fgts">Saldo FGTS</label>
              <input
                type="number"
                id="saldo_fgts"
                name="saldo_fgts"
                value={formData.saldo_fgts}
                onChange={handleChange}
                placeholder=""
                min="0"
                step="0.01"
                className="simple-input"
              />
            </div>

          </div>

        <div className="form-row">
          {/* Regime de trabalho Radio Buttons */}
          <div className="form-group">
            <label>Regime de trabalho</label>
            <div className="radio-group">
              <label className="radio-container">
                <input
                  type="radio"
                  name="cotista_fgts"
                  value="sim"
                  checked={formData.cotista_fgts === true}
                  onChange={handleRadioChange}
                />
                <span className="radio-label">CLT</span>
              </label>
              <label className="radio-container">
                <input
                  type="radio"
                  name="cotista_fgts"
                  value="nao"
                  checked={formData.cotista_fgts === false}
                  onChange={handleRadioChange}
                />
                <span className="radio-label">Autônomo</span>
              </label>
            </div>
          </div>
          
          {/* Dependentes Radio Buttons */}
          <div className="form-group">
            <label>Possui dependentes?</label>
            <div className="radio-group">
              <label className="radio-container">
                <input
                  type="radio"
                  name="possui_dependentes"
                  value="sim"
                  checked={formData.possui_dependentes === true}
                  onChange={handleRadioChange}
                />
                <span className="radio-label">Sim</span>
              </label>
              <label className="radio-container">
                <input
                  type="radio"
                  name="possui_dependentes"
                  value="nao"
                  checked={formData.possui_dependentes === false}
                  onChange={handleRadioChange}
                />
                <span className="radio-label">Não</span>
              </label>
            </div>
          </div>

          {/* Saldo FGTS Radio Buttons */}
          <div className="form-group">
            <label>Possui saldo no FGTS?</label>
            <div className="radio-group">
              <label className="radio-container">
                <input
                  type="radio"
                  name="possui_saldo_fgts"
                  value="sim"
                  checked={formData.possui_saldo_fgts === true}
                  onChange={handleRadioChange}
                />
                <span className="radio-label">Sim</span>
              </label>
              <label className="radio-container">
                <input
                  type="radio"
                  name="possui_saldo_fgts"
                  value="nao"
                  checked={formData.possui_saldo_fgts}
                  onChange={handleRadioChange}
                />
                <span className="radio-label">Não</span>
              </label>
            </div>
          </div>

        </div>

        <div className="form-row">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Seu email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                required
                className="simple-input"
              />
            </div>

            {/* Telefone */}
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder=""
                required
                className="simple-input"
              />
            </div>
          </div>

          <button type="submit" className="simulate-button">
            Simular
          </button>
        </form>

        {/* Resultado da simulação */}
        {isSubmitted && (
          <div className="result-section">
            <h2>Resultado da Simulação</h2>
            <div className="result-grid">
              <div className="result-item">
                <span>Valor do Imóvel:</span>
                <span>{formatCurrency(formData.valor_apartamento)}</span>
              </div>
              <div className="result-item">
                <span>Entrada:</span>
                <span>{formatCurrency(formData.entrada)}</span>
              </div>
              <div className="result-item">
                <span>FGTS usado:</span>
                <span>{formData.cotista_fgts ? 'Sim (R$ 20.000)' : 'Não'}</span>
              </div>
              <div className="result-item">
                <span>Prazo:</span>
                <span>{formData.prazo_anos} anos</span>
              </div>
              <div className="result-item">
                <span>Taxa de Juros:</span>
                <span>{formData.taxa_juros_anual ? `${formData.taxa_juros_anual} a.a.` : '9% a.a. (padrão)'}</span>
              </div>
              <div className="result-item">
                <span>Parcela estimada:</span>
                <span>{formatCurrency(parcelaMensal)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
