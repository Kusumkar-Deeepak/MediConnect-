import { useState } from 'react';
import Navbar from './Navbar';

const DiseaseInfo = () => {
  const [disease, setDisease] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setDisease(e.target.value);
  };

  // Disease data array with one disease (Malaria)
  const diseasesData = [
    {
      name: 'Malaria',
      description: 'Malaria is a serious and sometimes fatal disease caused by Plasmodium parasites. It is transmitted through the bite of infected Anopheles mosquitoes.',
      symptoms: [
        'Fever and chills', 'Headache', 'Sweating', 'Fatigue', 'Nausea and vomiting', 'Muscle pain', 'Enlarged spleen'
      ],
      causes: 'Malaria is caused by a parasite transmitted by the bite of an infected Anopheles mosquito.',
      riskFactors: 'People in malaria-endemic areas, pregnant women, and young children are at higher risk.',
      treatment: 'Antimalarial medications like chloroquine, ACTs, and intravenous medications for severe cases.',
      prescription: {
        tablets: 'Chloroquine 250mg',
        bottles: 'ACT (Artemisinin Combination Therapy) 1 bottle'
      }
    },
    {
        name: 'Chickenpox',
        description: 'Chickenpox is a highly contagious viral infection caused by the varicella-zoster virus, leading to an itchy rash with red spots and fluid-filled blisters.',
        symptoms: [
          'Itchy rash', 'Fever', 'Fatigue', 'Loss of appetite', 'Headache', 'Muscle aches'
        ],
        causes: 'Chickenpox is caused by the varicella-zoster virus, which spreads through respiratory droplets and direct contact with the rash.',
        riskFactors: 'People who have not been vaccinated, young children, and individuals with weakened immune systems are at higher risk.',
        treatment: 'Treatment involves symptomatic relief, such as antihistamines for itching, and antiviral medications for severe cases.',
        prescription: {
          tablets: 'Acyclovir 400mg',
          bottles: 'Calamine Lotion 250ml'
        }
      },
      {
        name: 'Hepatitis B',
        description: 'Hepatitis B is a viral infection that attacks the liver, potentially leading to chronic liver disease or liver cancer.',
        symptoms: [
          'Fatigue', 'Abdominal pain', 'Jaundice', 'Dark urine', 'Loss of appetite', 'Nausea'
        ],
        causes: 'Hepatitis B is caused by the Hepatitis B virus, which spreads through contact with infected bodily fluids.',
        riskFactors: 'People with unprotected sex, those who share needles, and healthcare workers are at higher risk.',
        treatment: 'Antiviral medications and vaccines for prevention.',
        prescription: {
          tablets: 'Lamivudine 100mg',
          bottles: 'Interferon Injection 5 million IU'
        }
      },
      {
        name: 'Gastroenteritis',
        description: 'Gastroenteritis is an infection of the stomach and intestines, often caused by a virus or bacteria, resulting in vomiting and diarrhea.',
        symptoms: [
          'Diarrhea', 'Vomiting', 'Abdominal cramps', 'Fever', 'Headache', 'Dehydration'
        ],
        causes: 'Gastroenteritis is commonly caused by viruses (like norovirus) or bacteria (like Salmonella or E. coli).',
        riskFactors: 'Young children, elderly individuals, and people with weakened immune systems are at higher risk.',
        treatment: 'Hydration, electrolytes, and anti-nausea medications. Antibiotics may be needed for bacterial infections.',
        prescription: {
          tablets: 'Loperamide 2mg',
          bottles: 'Oral Rehydration Solution 500ml'
        }
      },
      {
        name: 'Pneumococcal Disease',
        description: 'Pneumococcal disease refers to infections caused by the bacterium Streptococcus pneumoniae, including pneumonia, meningitis, and bloodstream infections.',
        symptoms: [
          'Cough', 'Fever', 'Shortness of breath', 'Chest pain', 'Headache', 'Stiff neck'
        ],
        causes: 'Pneumococcal disease is caused by Streptococcus pneumoniae bacteria, which spread through respiratory droplets.',
        riskFactors: 'Young children, elderly individuals, and people with weakened immune systems are more vulnerable.',
        treatment: 'Antibiotics such as penicillin or ceftriaxone are used to treat pneumococcal infections.',
        prescription: {
          tablets: 'Amoxicillin 500mg',
          bottles: 'Ceftriaxone Injection 1g'
        }
      },
      {
        name: 'Shingles',
        description: 'Shingles is a viral infection caused by the varicella-zoster virus, which reactivates after a person has had chickenpox, causing a painful rash.',
        symptoms: [
          'Painful rash', 'Blisters', 'Itching', 'Burning or tingling sensation', 'Fever', 'Headache'
        ],
        causes: 'Shingles is caused by the reactivation of the varicella-zoster virus, which remains dormant in nerve cells after a person has had chickenpox.',
        riskFactors: 'Older adults and individuals with weakened immune systems are at higher risk of developing shingles.',
        treatment: 'Antiviral medications and pain relievers to alleviate symptoms.',
        prescription: {
          tablets: 'Acyclovir 800mg',
          bottles: 'Lidocaine 5% Gel'
        }
      },
      {
        name: 'Leukemia',
        description: 'Leukemia is a type of cancer that affects blood and bone marrow, characterized by an overproduction of abnormal white blood cells.',
        symptoms: [
          'Fatigue', 'Easy bruising or bleeding', 'Fever', 'Frequent infections', 'Swollen lymph nodes'
        ],
        causes: 'Leukemia is caused by mutations in the DNA of blood cells that lead to uncontrolled growth.',
        riskFactors: 'Family history, exposure to certain chemicals, and previous chemotherapy can increase the risk.',
        treatment: 'Chemotherapy, targeted therapy, and stem cell transplants are used for treatment.',
        prescription: {
          tablets: 'Imatinib 100mg',
          bottles: 'Vincristine Injection 1mg'
        }
      },
      {
        name: 'Cystic Fibrosis',
        description: 'Cystic fibrosis is a genetic disorder that affects the lungs and digestive system, causing thick, sticky mucus to build up and cause severe respiratory and digestive problems.',
        symptoms: [
          'Chronic cough', 'Wheezing', 'Shortness of breath', 'Salty skin', 'Frequent lung infections'
        ],
        causes: 'Cystic fibrosis is caused by mutations in the CFTR gene, leading to dysfunctional chloride channels.',
        riskFactors: 'Cystic fibrosis is inherited, meaning both parents must carry the defective gene.',
        treatment: 'Chest physiotherapy, inhaled medications, and enzyme supplements to aid digestion.',
        prescription: {
          tablets: 'Pancrelipase 500mg',
          bottles: 'Albuterol Inhaler 90mcg/dose'
        }
      },
      {
        name: 'Alzheimer’s Disease',
        description: 'Alzheimer’s disease is a progressive neurodegenerative disorder that leads to memory loss, confusion, and changes in behavior.',
        symptoms: [
          'Memory loss', 'Confusion', 'Difficulty performing familiar tasks', 'Personality changes', 'Disorientation'
        ],
        causes: 'Alzheimer’s disease is caused by the accumulation of amyloid plaques and tau tangles in the brain.',
        riskFactors: 'Age, family history, and genetic mutations increase the risk of Alzheimer’s disease.',
        treatment: 'There is no cure, but medications like cholinesterase inhibitors may help manage symptoms.',
        prescription: {
          tablets: 'Donepezil 5mg',
          bottles: 'Memantine 10mg'
        }
      },
      {
        name: 'Multiple Sclerosis',
        description: 'Multiple sclerosis is a chronic autoimmune disease that affects the central nervous system, leading to a variety of neurological symptoms.',
        symptoms: [
          'Fatigue', 'Numbness or tingling', 'Muscle weakness', 'Vision problems', 'Coordination problems'
        ],
        causes: 'MS occurs when the immune system attacks the protective covering of nerve fibers, disrupting communication between the brain and the rest of the body.',
        riskFactors: 'Age, gender (more common in women), and family history can increase the risk.',
        treatment: 'Disease-modifying therapies (DMTs) and medications to manage symptoms.',
        prescription: {
          tablets: 'Dimethyl fumarate 120mg',
          bottles: 'Methylprednisolone Injection 100mg/2ml'
        }
      },
      {
        name: 'Migraine',
        description: 'Migraine is a neurological condition characterized by intense headaches, often accompanied by nausea, vomiting, and sensitivity to light and sound.',
        symptoms: [
          'Severe headache', 'Nausea', 'Vomiting', 'Sensitivity to light and sound', 'Aura (flashes of light or blind spots)'
        ],
        causes: 'The exact cause is unknown, but genetics and environmental factors may play a role.',
        riskFactors: 'Family history, stress, hormonal changes, and certain foods or drinks can trigger migraines.',
        treatment: 'Pain relief medications, anti-nausea drugs, and preventive treatments.',
        prescription: {
          tablets: 'Sumatriptan 50mg',
          bottles: 'Ondansetron 4mg/2ml'
        }
      },
    {
      name: 'Tuberculosis',
      description: 'Tuberculosis (TB) is a bacterial infection that primarily affects the lungs, though it can impact other parts of the body.',
      symptoms: [
        'Cough (with blood)', 'Weight loss', 'Night sweats', 'Fever', 'Fatigue', 'Chest pain'
      ],
      causes: 'TB is caused by a bacterium called Mycobacterium tuberculosis, which spreads through the air.',
      riskFactors: 'People with weakened immune systems, such as those with HIV, are at higher risk.',
      treatment: 'TB is treated with a combination of antibiotics, such as Rifampin and Isoniazid.',
      prescription: {
        tablets: 'Isoniazid 300mg',
        bottles: 'Rifampin 10mg/ml'
      }
    },
    {
      name: 'COVID-19',
      description: 'COVID-19 is a viral infection caused by the SARS-CoV-2 virus, leading to respiratory issues and, in severe cases, organ failure.',
      symptoms: [
        'Fever', 'Cough', 'Shortness of breath', 'Fatigue', 'Loss of taste and smell', 'Muscle pain'
      ],
      causes: 'COVID-19 is caused by the SARS-CoV-2 virus, which spreads through respiratory droplets.',
      riskFactors: 'Elderly individuals and people with pre-existing health conditions are at greater risk.',
      treatment: 'Treatment includes antivirals, corticosteroids, and oxygen therapy in severe cases.',
      prescription: {
        tablets: 'Remdesivir 100mg',
        bottles: 'Dexamethasone 20mg/50ml'
      }
    },
    {
      name: 'Diabetes',
      description: 'Diabetes is a metabolic disorder where the body cannot properly process blood sugar (glucose), leading to high levels.',
      symptoms: [
        'Increased thirst', 'Frequent urination', 'Extreme hunger', 'Fatigue', 'Blurred vision', 'Slow healing wounds'
      ],
      causes: 'Diabetes is caused by either insufficient insulin production or the body’s inability to respond properly to insulin.',
      riskFactors: 'Obesity, age over 45, and a family history of diabetes increase the risk.',
      treatment: 'Insulin therapy and oral medications to control blood sugar levels.',
      prescription: {
        tablets: 'Metformin 500mg',
        bottles: 'Insulin Glargine 100 units/ml'
      }
    },
    {
      name: 'HIV/AIDS',
      description: 'HIV is a virus that attacks the immune system, and when left untreated, it can progress to AIDS, which severely weakens the immune system.',
      symptoms: [
        'Fever', 'Chills', 'Swollen lymph nodes', 'Rash', 'Night sweats', 'Rapid weight loss'
      ],
      causes: 'HIV spreads through contact with infected bodily fluids, such as blood or semen.',
      riskFactors: 'Unprotected sex, sharing needles, and blood transfusions can increase the risk.',
      treatment: 'Antiretroviral therapy (ART) is used to manage HIV and prevent it from progressing to AIDS.',
      prescription: {
        tablets: 'Tenofovir 300mg',
        bottles: 'Emtricitabine 200mg'
      }
    },
    {
      name: 'Asthma',
      description: 'Asthma is a chronic condition that causes inflammation and narrowing of the airways, leading to difficulty breathing.',
      symptoms: [
        'Wheezing', 'Coughing', 'Shortness of breath', 'Chest tightness', 'Increased mucus production'
      ],
      causes: 'Asthma can be triggered by allergens, respiratory infections, or physical activity.',
      riskFactors: 'Family history of asthma, exposure to allergens, and smoking can increase the risk.',
      treatment: 'Bronchodilators and corticosteroids to open the airways and reduce inflammation.',
      prescription: {
        tablets: 'Montelukast 10mg',
        bottles: 'Salbutamol Inhaler 100mcg/dose'
      }
    },
    {
      name: 'Cancer',
      description: 'Cancer is a group of diseases characterized by abnormal cell growth that can spread to other parts of the body.',
      symptoms: [
        'Unexplained weight loss', 'Fatigue', 'Pain', 'Skin changes', 'Unusual bleeding', 'Persistent cough'
      ],
      causes: 'Cancer is caused by genetic mutations that lead to uncontrolled cell division.',
      riskFactors: 'Tobacco use, excessive alcohol, family history, and exposure to certain chemicals increase the risk.',
      treatment: 'Chemotherapy, radiation therapy, and surgery are common treatments.',
      prescription: {
        tablets: 'Tamoxifen 10mg',
        bottles: 'Doxorubicin Injection 50mg/25ml'
      }
    },
    {
      name: 'Hypertension',
      description: 'Hypertension (high blood pressure) is a common condition where the force of the blood against the artery walls is consistently too high.',
      symptoms: [
        'Headache', 'Shortness of breath', 'Nosebleeds', 'Fatigue', 'Dizziness'
      ],
      causes: 'Causes of hypertension can include obesity, lack of physical activity, and poor diet.',
      riskFactors: 'Family history, smoking, excessive alcohol use, and high salt intake increase the risk.',
      treatment: 'Antihypertensive drugs like ACE inhibitors, calcium channel blockers, and diuretics.',
      prescription: {
        tablets: 'Amlodipine 5mg',
        bottles: 'Lisinopril 10mg'
      }
    },
    {
      name: 'Pneumonia',
      description: 'Pneumonia is an infection of the lungs that can be caused by bacteria, viruses, or fungi, leading to inflammation in the lungs.',
      symptoms: [
        'Cough', 'Shortness of breath', 'Chest pain', 'Fever', 'Fatigue', 'Nausea and vomiting'
      ],
      causes: 'Pneumonia is often caused by bacteria such as Streptococcus pneumoniae or viruses like influenza.',
      riskFactors: 'Elderly individuals, smokers, and people with compromised immune systems are at higher risk.',
      treatment: 'Antibiotics for bacterial pneumonia, antivirals for viral pneumonia.',
      prescription: {
        tablets: 'Amoxicillin 500mg',
        bottles: 'Azithromycin 250mg'
      }
    },
    {
      name: 'Influenza',
      description: 'Influenza (flu) is a viral infection that attacks the respiratory system, causing fever, cough, and body aches.',
      symptoms: [
        'Fever', 'Cough', 'Sore throat', 'Body aches', 'Fatigue', 'Headache'
      ],
      causes: 'Influenza is caused by the influenza virus, which spreads through respiratory droplets.',
      riskFactors: 'Elderly, young children, pregnant women, and people with weak immune systems are at higher risk.',
      treatment: 'Antiviral medications, rest, and fluids.',
      prescription: {
        tablets: 'Oseltamivir 75mg',
        bottles: 'Zanamivir Inhaler 5mg/dose'
      }
    }
  ];
  

  const handleSearch = () => {
    if (!disease) {
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    // Find the disease data
    const foundDisease = diseasesData.find(d => d.name.toLowerCase() === disease.toLowerCase());

    setTimeout(() => {
      if (foundDisease) {
        setData(foundDisease);
      } else {
        setError('Disease not found');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <hr />
      <div className="min-h-screen bg-gray-50 mt-2 flex flex-col justify-center items-center py-10 px-4">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 lg:p-12">
  
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-600 mb-6 sm:mb-8">
            Disease Information Finder
          </h1>
  
          {/* Disease Search Input */}
          <input
            type="text"
            className="w-full p-4 mb-4 sm:mb-6 border border-gray-300 rounded-md text-lg"
            placeholder="Enter disease name (e.g., Malaria, Tuberculosis)"
            value={disease}
            onChange={handleInputChange}
          />
  
          {/* Search Button */}
          <button
            className="w-full py-3 bg-blue-600 text-white text-xl rounded-md hover:bg-blue-700 transition duration-300"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
  
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
  
          {data && (
            <div className="mt-6 space-y-6 sm:mt-8">
              {/* Disease Name */}
              <div className="text-center p-4 border-b-2 border-blue-600">
                <h2 className="text-2xl sm:text-3xl font-semibold">{data.name}</h2>
              </div>
  
              {/* Description */}
              <div className="p-4 sm:p-6 border rounded-lg shadow-md bg-gray-50">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">Description</h3>
                <p className="text-base sm:text-lg text-gray-700">{data.description}</p>
              </div>
  
              {/* Symptoms and Prescription */}
              <div className="flex flex-col sm:flex-row sm:justify-between p-4 sm:p-6 border rounded-lg shadow-md bg-gray-50">
                {/* Symptoms */}
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">Symptoms</h3>
                  <ul className="space-y-2">
                    {data.symptoms.map((symptom, index) => (
                      <li key={index} className="text-base sm:text-lg text-gray-700">{symptom}</li>
                    ))}
                  </ul>
                </div>
  
                {/* Prescription */}
                <div className="w-full sm:w-1/2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">Prescription</h3>
                  <p className="text-base sm:text-lg text-gray-700">
                    Tablets: {data.prescription.tablets}<br />
                    Bottles: {data.prescription.bottles}
                  </p>
                </div>
              </div>
  
              {/* Causes and Risk Factors */}
              <div className="flex flex-col sm:flex-row sm:justify-between p-4 sm:p-6 border rounded-lg shadow-md bg-gray-50">
                {/* Causes */}
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">Causes</h3>
                  <p className="text-base sm:text-lg text-gray-700">{data.causes}</p>
                </div>
  
                {/* Risk Factors */}
                <div className="w-full sm:w-1/2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">Risk Factors</h3>
                  <p className="text-base sm:text-lg text-gray-700">{data.riskFactors}</p>
                </div>
              </div>
  
              {/* Treatment */}
              <div className="text-center p-4 sm:p-6 border rounded-lg shadow-md bg-gray-50">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">Treatment</h3>
                <p className="text-base sm:text-lg text-gray-700">{data.treatment}</p>
              </div>
            </div>
          )}
  
          {/* Warning Section */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-yellow-200 border border-yellow-500 rounded-lg shadow-md">
            <h4 className="text-lg sm:text-xl font-semibold text-yellow-800">Warning</h4>
            <p className="text-base sm:text-lg text-yellow-700">
              The information provided here is for educational purposes only. Always consult a medical professional for diagnosis and treatment.
            </p>
          </div>
  
        </div>
      </div>
    </>
  );
  
  
};

export default DiseaseInfo;
