/**
 * Helper lib
 * 
 */

export const defaultHeader = {
  headers: {    
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
};

export function saveConfig(appConfig) {
    let conf = {...appConfig}
    console.log('save:', conf)
    if(conf.isSaving)    
      return false
    conf.isSaving = true
    const urlAPIConfig = localStorage.getItem("urlAPIConfig") || "http://localhost:9080/apiserver/config";
    (async () => {
        const rawResponse = await fetch(urlAPIConfig, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(conf)
        }).then(
          (response) => {
            if (response.status >= 400 && response.status < 600) {
              throw new Error("Bad response from server");
            }
            return response;
          }).then(
          (rawResponse) => {
            console.log(rawResponse.json())
            return true;//rawResponse.json()
          }).catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
          return false
        });
        //const content = await rawResponse.json();
      
        //console.log('content', content);
        return true
      })();      
};

export async function readConfig(setAppConfig) {
  const urlAPIConfig = localStorage.getItem("urlAPIConfig") || "http://localhost:9080/apiserver/config";
    (async () => {
        const rawResponse = await fetch(urlAPIConfig, {          
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },          
        }).then(res => res.json())
        .then(
            (data) => {
                //setIsLoaded(true);
                //const r = data.filter(el => el.entity_id.startsWith("climate."));
                const conf = data //JSON.parse(data)
                console.log(data)
                //console.log('rconfig',conf)
                setAppConfig(conf)
                //setClimateSensors(r.map(i => i.entity_id));
            }
        )
        //const conf = await rawResponse.json();                      
      })();       
}

/**
 * 
 * @param {*} sensors 
 * @param {*} temperature 
 */
export function setTemperature(sensors, temperature) {
  let data = {
    sensors: sensors,
    temperature: temperature
  }
  console.log('In setTemperature, data:', data)
  
  const urlAPI = "http://localhost:9080/apiserver/setTemperature";
  (async () => {
      const rawResponse = await fetch(urlAPI, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const content = await rawResponse.json();
    
      console.log('In setTemperature, after: ', content);
    })();       
};

