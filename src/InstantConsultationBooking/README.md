This is instant consultation component readme file. You have been provided find doctor search component and  doctorCard fuctionality to display doctors along. You need to integrate instant consultation component with your react website.
## Note:
You need to include the InstantConsultation into App.js. 
**use this to import in App.js**
import InstantConsultation from './components/InstantConsultation/InstantConsultation';  
**Use below to write within Route tag of react-router-dom** 
<Route path="/instant-consultation" element={<InstantConsultation />} />

## Note:
You can create one button on Navbar as well for instant Booking Consultation which will directly take user to that option for route specified above.


## Note:
useSearchParams is a custom hook introduced in React that provides a convenient way to interact with query parameters in a URL's search string. This hook allows developers to extract, modify, and update query parameters from the URL, enabling dynamic and interactive behavior in React applications. Whether it's building search functionalities, implementing filtering options, or managing state based on URL parameters. For example this is used in **InstantConsultation.js** component to extract searched doctor specility in the basis of what user has searched in search box. Below code is the demo for the code which has been used in **InstantConsultation.js** component.

import { useNavigate, useSearchParams } from 'react-router-dom';
 const [searchParams] = useSearchParams();
   if (searchParams.get('speciality')) {
                // window.reload()
                const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());

                setFilteredDoctors(filtered);
                
                setIsSearched(true);
                window.reload()
            }