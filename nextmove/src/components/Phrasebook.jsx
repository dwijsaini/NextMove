import './Phrasebook.css';

const languageData = {
  // French
  FR: {
    language: 'French',
    phrases: [
      { english: 'Hello', local: 'Bonjour', phonetic: 'bohn-zhoor' },
      { english: 'Thank you', local: 'Merci', phonetic: 'mair-see' },
      { english: 'Please', local: 'S’il vous plaît', phonetic: 'seel voo pleh' },
      { english: 'How much is this?', local: 'Combien ça coûte ?', phonetic: 'cohm-byah sah coot' },
      { english: 'Where is the restroom?', local: 'Où sont les toilettes ?', phonetic: 'oo sohn ley twah-let' },
    ]
  },
  // Japanese
  JP: {
    language: 'Japanese',
    phrases: [
      { english: 'Hello', local: 'こんにちは (Konnichiwa)', phonetic: 'kon-nee-chee-wah' },
      { english: 'Thank you', local: 'ありがとう (Arigatou)', phonetic: 'ah-ree-gah-toe' },
      { english: 'Please', local: 'お願いします (Onegaishimasu)', phonetic: 'oh-neh-guy-shee-mas' },
      { english: 'How much is this?', local: 'これはいくらですか？ (Kore wa ikura desu ka?)', phonetic: 'ko-reh wah ee-koo-rah dess kah' },
      { english: 'Where is the restroom?', local: 'お手洗いはどこですか？ (Otearai wa doko desu ka?)', phonetic: 'oh-teh-ah-rye wah doe-ko dess kah' },
    ]
  },
  // Spanish
  ES: {
    language: 'Spanish',
    phrases: [
      { english: 'Hello', local: 'Hola', phonetic: 'oh-lah' },
      { english: 'Thank you', local: 'Gracias', phonetic: 'grah-syahs' },
      { english: 'Please', local: 'Por favor', phonetic: 'por fah-vor' },
      { english: 'How much is this?', local: '¿Cuánto cuesta?', phonetic: 'kwan-toe kwess-tah' },
      { english: 'Where is the restroom?', local: '¿Dónde está el baño?', phonetic: 'don-deh ess-tah el bah-nyo' },
    ]
  },
  MX: {
    language: 'Spanish',
    phrases: [
      { english: 'Hello', local: 'Hola', phonetic: 'oh-lah' },
      { english: 'Thank you', local: 'Gracias', phonetic: 'grah-syahs' },
      { english: 'Please', local: 'Por favor', phonetic: 'por fah-vor' },
      { english: 'How much is this?', local: '¿Cuánto cuesta?', phonetic: 'kwan-toe kwess-tah' },
      { english: 'Where is the restroom?', local: '¿Dónde está el baño?', phonetic: 'don-deh ess-tah el bah-nyo' },
    ]
  },
  // Italian
  IT: {
    language: 'Italian',
    phrases: [
      { english: 'Hello', local: 'Ciao', phonetic: 'chow' },
      { english: 'Thank you', local: 'Grazie', phonetic: 'grah-tsyeh' },
      { english: 'Please', local: 'Per favore', phonetic: 'pehr fah-voh-reh' },
      { english: 'How much is this?', local: 'Quanto costa?', phonetic: 'kwan-toe caws-tah' },
      { english: 'Where is the restroom?', local: 'Dov’è il bagno?', phonetic: 'doh-veh eel bah-nyo' },
    ]
  },
  // German
  DE: {
    language: 'German',
    phrases: [
      { english: 'Hello', local: 'Hallo / Guten Tag', phonetic: 'hah-loh / goo-ten tahg' },
      { english: 'Thank you', local: 'Danke', phonetic: 'dahn-keh' },
      { english: 'Please', local: 'Bitte', phonetic: 'bit-teh' },
      { english: 'How much is this?', local: 'Wie viel kostet das?', phonetic: 'vee feel kos-tet dahs' },
      { english: 'Where is the restroom?', local: 'Wo ist die Toilette?', phonetic: 'voh ist dee twah-let-teh' },
    ]
  },
  // Hindi
  IN: {
    language: 'Hindi',
    phrases: [
      { english: 'Hello', local: 'नमस्ते (Namaste)', phonetic: 'nah-mah-stay' },
      { english: 'Thank you', local: 'धन्यवाद (Dhanyavaad)', phonetic: 'dhahn-yah-vahd' },
      { english: 'Please', local: 'कृपया (Kripya)', phonetic: 'krip-yah' },
      { english: 'How much is this?', local: 'यह कितने का है? (Yeh kitne ka hai?)', phonetic: 'yay kit-nay kah hay' },
      { english: 'Where is the restroom?', local: 'शौचालय कहाँ है? (Shauchalay kahan hai?)', phonetic: 'shao-chaa-lay kah-han hay' },
    ]
  },
  // Chinese
  CN: {
    language: 'Chinese (Mandarin)',
    phrases: [
      { english: 'Hello', local: '你好 (Nǐ hǎo)', phonetic: 'nee how' },
      { english: 'Thank you', local: '谢谢 (Xièxiè)', phonetic: 'shyeh-shyeh' },
      { english: 'Please', local: '请 (Qǐng)', phonetic: 'ching' },
      { english: 'How much is this?', local: '这个多少钱？ (Zhège duōshǎo qián?)', phonetic: 'juh-guh dwor-shaow chyen' },
      { english: 'Where is the restroom?', local: '厕所在哪里？ (Cèsuǒ zài nǎlǐ?)', phonetic: 'tsuh-swor dzai nigh-lee' },
    ]
  },
  // Thai
  TH: {
    language: 'Thai',
    phrases: [
      { english: 'Hello', local: 'สวัสดี (Sawatdee)', phonetic: 'sah-wahd-dee' },
      { english: 'Thank you', local: 'ขอบคุณ (Khop khun)', phonetic: 'kop-koon' },
      { english: 'Please', local: 'กรุณา (Karuna)', phonetic: 'kah-roo-nah' },
      { english: 'How much is this?', local: 'นี่เท่าไหร่ (Nee tao rai?)', phonetic: 'nee tao-rye' },
      { english: 'Where is the restroom?', local: 'ห้องน้ำอยู่ที่ไหน (Hong nam yoo tee nai?)', phonetic: 'hong-nam yoo tee-nye' },
    ]
  },
  // Arabic
  AE: {
    language: 'Arabic',
    phrases: [
      { english: 'Hello', local: 'مرحباً (Marhaban)', phonetic: 'mar-hah-ban' },
      { english: 'Thank you', local: 'شكراً (Shukran)', phonetic: 'shook-ran' },
      { english: 'Please', local: 'من فضلك (Min fadlik)', phonetic: 'min fad-lik' },
      { english: 'How much is this?', local: 'بكم هذا؟ (Bikam hadha?)', phonetic: 'bee-kam hah-tha' },
      { english: 'Where is the restroom?', local: 'أين الحمام؟ (Ayna al-hammam?)', phonetic: 'ay-nal ham-mam' },
    ]
  },
  SA: {
    language: 'Arabic',
    phrases: [
      { english: 'Hello', local: 'مرحباً (Marhaban)', phonetic: 'mar-hah-ban' },
      { english: 'Thank you', local: 'شكراً (Shukran)', phonetic: 'shook-ran' },
      { english: 'Please', local: 'من فضلك (Min fadlik)', phonetic: 'min fad-lik' },
      { english: 'How much is this?', local: 'بكم هذا؟ (Bikam hadha?)', phonetic: 'bee-kam hah-tha' },
      { english: 'Where is the restroom?', local: 'أين الحمام؟ (Ayna al-hammam?)', phonetic: 'ay-nal ham-mam' },
    ]
  },
  // Portuguese
  PT: {
    language: 'Portuguese',
    phrases: [
      { english: 'Hello', local: 'Olá', phonetic: 'oh-lah' },
      { english: 'Thank you', local: 'Obrigado', phonetic: 'oh-bree-gah-doo' },
      { english: 'Please', local: 'Por favor', phonetic: 'poor fah-vohr' },
      { english: 'How much is this?', local: 'Quanto custa?', phonetic: 'kwan-too coos-tah' },
      { english: 'Where is the restroom?', local: 'Onde fica o banheiro?', phonetic: 'on-djee fee-cah oo bah-nye-roo' },
    ]
  },
  BR: {
    language: 'Portuguese',
    phrases: [
      { english: 'Hello', local: 'Olá', phonetic: 'oh-lah' },
      { english: 'Thank you', local: 'Obrigado', phonetic: 'oh-bree-gah-doo' },
      { english: 'Please', local: 'Por favor', phonetic: 'poor fah-vohr' },
      { english: 'How much is this?', local: 'Quanto custa?', phonetic: 'kwan-too coos-tah' },
      { english: 'Where is the restroom?', local: 'Onde fica o banheiro?', phonetic: 'on-djee fee-cah oo bah-nye-roo' },
    ]
  },
};

const Phrasebook = ({ countryCode }) => {
  if (!countryCode) return null;

  const data = languageData[countryCode];
  if (!data) return null; // If language isn't mapped, do not render (avoids crowding)

  return (
    <article className="card phrasebook-card">
      <div className="card-header">
        <div>
          <p className="card-label">Local Language - {data.language}</p>
          <h3>Essential Phrasebook</h3>
        </div>
      </div>

      <div className="phrasebook-list">
        {data.phrases.map((phrase, idx) => (
          <div key={idx} className="phrase-item">
            <div className="phrase-meanings">
              <span className="phrase-english">{phrase.english}</span>
              <strong className="phrase-local">{phrase.local}</strong>
            </div>
            <span className="phrase-phonetic" title="Pronunciation guide">
              &ldquo;{phrase.phonetic}&rdquo;
            </span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Phrasebook;
