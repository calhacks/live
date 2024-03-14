export default async function getConfiguration() {
  let config = {
    banner_text: '',
    banner_url: '',
    hero_image: 'https://calhacks-sierra.s3.us-west-2.amazonaws.com/assets/live/bigbear.svg',
    logo: 'https://calhacks-sierra.s3.us-west-2.amazonaws.com/assets/live/logo.svg',
    start_date: 1708876800 * 1000,
    end_date: 1708916400 * 1000,
    map: 'https://calhacks-sierra.s3.us-west-2.amazonaws.com/assets/hackathonsatberkeley/map.png',
    'color-one': '#1f4d61',
    'color-two': '#307c9c',
    'color-three': '#c7e9f4',
    'color-four': '#dbf4fc',
    'color-five': '#edfaff',
  };
  try {
    const res = await fetch(`${apiBaseUrl}/live/prizes`);
    const { configs } = await res.json();
    configs.map((configItem) => {
      config[configItem['key']] = configItem['value'];
    });
    console.log(config);
    return config;
  } catch (error) {
    console.log(config);
    return config;
  }
}
