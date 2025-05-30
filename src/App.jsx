import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    valor_apartamento: '',
    entrada: '',
    renda_familiar: '',
    cotista_fgts: false,
    usar_fgts: false,
    taxa_juros_anual: '',
    prazo_meses: '',
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

  const calcularParcela = () => {
    const valorImovel = parseFloat(formData.valor_apartamento || 0);
    const entrada = parseFloat(formData.entrada || 0);
    const fgtsUsado = formData.cotista_fgts && formData.usar_fgts ? 20000 : 0;
    const valorFinanciado = valorImovel - entrada - fgtsUsado;

    const prazo = parseInt(formData.prazo_meses || 0);
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
    console.log(formData);
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
        <h1>Simulador de Financiamento</h1>
        <p className="subtitle">Preencha os dados abaixo para simular seu financiamento</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            {/* Valor do imóvel */}
            <div className="form-group">
              <label htmlFor="valor_apartamento">Valor do Imóvel</label>
              <div className="input-wrapper">
                <span className="currency-symbol">R$</span>
                <input
                  type="number"
                  id="valor_apartamento"
                  name="valor_apartamento"
                  value={formData.valor_apartamento}
                  onChange={handleChange}
                  placeholder="0,00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Entrada */}
            <div className="form-group">
              <label htmlFor="entrada">Valor da Entrada</label>
              <div className="input-wrapper">
                <span className="currency-symbol">R$</span>
                <input
                  type="number"
                  id="entrada"
                  name="entrada"
                  value={formData.entrada}
                  onChange={handleChange}
                  placeholder="0,00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            {/* Renda familiar */}
            <div className="form-group">
              <label htmlFor="renda_familiar">Renda Familiar Mensal</label>
              <div className="input-wrapper">
                <span className="currency-symbol">R$</span>
                <input
                  type="number"
                  id="renda_familiar"
                  name="renda_familiar"
                  value={formData.renda_familiar}
                  onChange={handleChange}
                  placeholder="0,00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-group fgts-group">
              {/* Cotista do FGTS */}
              <div className="checkbox-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    id="cotista_fgts"
                    name="cotista_fgts"
                    checked={formData.cotista_fgts}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Sou cotista do FGTS
                </label>
              </div>

              {/* Usar FGTS */}
              {formData.cotista_fgts && (
                <div className="checkbox-group">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      id="usar_fgts"
                      name="usar_fgts"
                      checked={formData.usar_fgts}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    Usar R$ 20.000 do FGTS como entrada
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            {/* Taxa de juros */}
            <div className="form-group">
              <label htmlFor="taxa_juros_anual">Taxa de Juros Anual (%)</label>
              <input
                type="number"
                id="taxa_juros_anual"
                name="taxa_juros_anual"
                value={formData.taxa_juros_anual}
                onChange={handleChange}
                placeholder="Taxa padrão: 9%"
                min="0"
                step="0.01"
              />
            </div>

            {/* Prazo */}
            <div className="form-group">
              <label htmlFor="prazo_meses">Prazo (meses)</label>
              <input
                type="number"
                id="prazo_meses"
                name="prazo_meses"
                value={formData.prazo_meses}
                onChange={handleChange}
                placeholder="Ex: 240"
                required
                min="1"
              />
            </div>
          </div>

          <div className="form-row">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Seu email"
                required
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
                placeholder="(00) 00000-0000"
                required
              />
            </div>
          </div>

          {/* Concorda com os termos */}
          <div className="form-group checkbox-group terms-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="concorda_termos"
                name="concorda_termos"
                checked={formData.concorda_termos}
                onChange={handleChange}
                required
              />
              <span className="checkmark"></span>
              Concordo com os <a href="#">termos e condições</a>
            </label>
          </div>

          <button type="submit" className="submit-button">
            Simular Financiamento
          </button>
        </form>

        {/* Resultado da simulação */}
        {isSubmitted && (
          <div className="result-section">
            <h2>Resumo da Simulação</h2>
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
                <span>{formData.usar_fgts && formData.cotista_fgts ? 'Sim (R$ 20.000)' : 'Não'}</span>
              </div>
              <div className="result-item">
                <span>Prazo:</span>
                <span>{formData.prazo_meses} meses</span>
              </div>
              <div className="result-item">
                <span>Taxa de Juros:</span>
                <span>{formData.taxa_juros_anual ? `${formData.taxa_juros_anual}% a.a.` : '9% a.a. (padrão)'}</span>
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
