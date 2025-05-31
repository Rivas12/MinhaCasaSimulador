import { useNavigate } from 'react-router-dom';
import './termos.css';

function Termos() {
  const navigate = useNavigate();

  return (
    <div className="simulator-container">
      <div className="simulator-card terms-card">
        <h1 className="handwritten-title">Termos e Condições</h1>
        
        <div className="terms-content">
          <section>
            <h2>1. Introdução</h2>
            <p>Bem-vindo ao Simulador Minha Casa Minha Vida. Ao utilizar este serviço, você concorda com os termos e condições descritos neste documento.</p>
          </section>

          <section>
            <h2>2. Natureza do Serviço</h2>
            <p>Este simulador fornece cálculos aproximados de financiamento imobiliário com base nas informações fornecidas. Os resultados são meramente informativos e não constituem uma oferta de crédito ou garantia de aprovação.</p>
          </section>

          <section>
            <h2>3. Precisão das Informações</h2>
            <p>Os valores, taxas e condições apresentados são aproximados e podem variar de acordo com a análise de crédito, políticas vigentes da Caixa Econômica Federal e outros fatores individuais não contemplados nesta simulação.</p>
          </section>

          <section>
            <h2>4. Uso de Dados Pessoais</h2>
            <p>Ao utilizar nosso simulador, você concorda com a coleta e processamento dos dados fornecidos para fins de:</p>
            <ul>
              <li>Realizar a simulação solicitada</li>
              <li>Entrar em contato para oferecer serviços relacionados</li>
              <li>Melhorar nossos produtos e serviços</li>
              <li>Cumprir obrigações legais</li>
            </ul>
            <p>Seus dados serão armazenados de forma segura e não serão compartilhados com terceiros sem seu consentimento, exceto quando exigido por lei.</p>
          </section>

          <section>
            <h2>5. Direitos do Usuário</h2>
            <p>Você tem o direito de solicitar acesso, correção ou exclusão de seus dados pessoais a qualquer momento, enviando um e-mail para contato@minhacasaminhavida.com.br.</p>
          </section>

          <section>
            <h2>6. Limitação de Responsabilidade</h2>
            <p>Não nos responsabilizamos por decisões tomadas com base nas simulações realizadas. Recomendamos sempre consultar um especialista em financiamento imobiliário antes de tomar qualquer decisão financeira.</p>
          </section>

          <section>
            <h2>7. Alterações nos Termos</h2>
            <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação nesta página.</p>
          </section>
        </div>
        
        <button 
          className="simulate-button"
          onClick={() => navigate('/')}
        >
          Voltar para o simulador
        </button>
      </div>
    </div>
  );
}

export default Termos;