import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import mapIcon from '../../utils/mapIcon';
import Button from '../inputs/Button';
import Checkbox from '../inputs/Checkbox';
import InputText from '../inputs/Input';
import Textarea from '../inputs/TextArea';

interface Category {
  id: string;
  title: string;
}

type User = {
  id: string;
  email: string;
  userType: string;
}

interface TouristicPointInterface {
  id: string;
  categoryId: string;
  geolocation: {
    id: number,
    latitude: number,
    longitude: number,
  };
  name: string;
  about: string;
  instructions: string;
  openingHours: string;
  petFriendly: boolean;
  openOnWeekends:boolean;
  pictures: Array<{
    _id:number;
    location: string;
    originalname:string;
  }>;
}

type TouristicPointParams = {
  id: string;
}

type Picture = {
  originalname: string;
  location: string;
	key: string;
}

export default function UpdateTouristicPointForm() {
  const params = useParams<TouristicPointParams>();
  const [getTouristicPoint, setTouristicPoint] = useState<TouristicPointInterface>();
  const [user, setUser] = useState({} as User);
  const [getPosition, setPosition] = useState({ latitude: 0, longitude: 0});
  const [getCategories, setCategories] = useState<Category[]>([]);
  const [getSelectedCategory, setSelectedCategory] = useState('');
  const [getName, setName] = useState('');
  const [getAbout, setAbout] = useState('');
  const [getOpeningHours, setOpeningHours] = useState('');
  const [getOpeningOnWeekends, setOpeningOnWeekends] = useState(true);
  const [getImages, setImages] = useState<File[]>([]);
  const [getPreviewImages, setPreviewImages] = useState<string[]>([]);
  const [getPetFriendly, setPetFriendly] = useState(false);
  const [getSite, setSite] = useState('');
  const [getFacebook, setFacebook] = useState('');
  const [getInstagram, setInstagram] = useState('');
  const [getYoutube, setYoutube] = useState('');
  const [getWhatsapp, setWhatsapp] = useState('');
  const [getPhoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`touristicpoint/${params.id}`).then((response) => {
      const { 
        about,
        name,
        openingHours,
        category_id,
        openOnWeekends,
        petFriendly,
        geolocation,
        pictures,
        website,
		    facebook,
		    instagram,
		    youtube,
		    whatsappNumber,
		    phoneNumber      
      } = response.data.schema;
      setAbout(about);
      setName(name);
      setOpeningHours(openingHours);
      setSelectedCategory(category_id);
      setOpeningOnWeekends(openOnWeekends === true);
      setPetFriendly(petFriendly === true);
      setPosition({latitude: geolocation.latitude, longitude: geolocation.longitude});
      const images = pictures.map((picture: Picture) => {
        return picture.location;
      })
      setPreviewImages(images);
      setSite(website);
      setFacebook(facebook);
      setInstagram(instagram);
      setPhoneNumber(phoneNumber);
      setWhatsapp(whatsappNumber);
      setYoutube(youtube);
      setTouristicPoint(response.data.schema);
    });

    api.get('category').then((response) => {
      setCategories(response.data.schema);
    });

    const recoveredUser = localStorage.getItem('user');
    
    if (recoveredUser) {
        setUser(JSON.parse(recoveredUser));
    }
  }, [])

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  function handleCategory(event: ChangeEvent<HTMLSelectElement>) {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  }

  let obj: Errors = {};
  const [errors, setErrors] = useState(obj);

  type Errors = {
      validate ?: boolean;
      name ?: string;
      about ?: string;
      image ?: string;
      openingHours ?: string;
      position ?: string;
  }

  function validate() {
      const errors: Errors = {};
      errors.validate = true;

      if (getName.length <= 0) {
        errors.validate = false;
        errors.name = "O campo nome é obrigatório.";
      }

      if (getAbout.length <= 0) {
        errors.validate = false;
        errors.about = "O campo sobre é obrigatório.";
      }

      if (getPreviewImages.length <= 0) {
        errors.validate = false;
        errors.image = "Insira uma imagem.";
      }

      if (getOpeningHours.length <= 0) {
        errors.validate = false;
        errors.openingHours = "O campo horário de funcionamento é obrigatório.";
      }

      if (getPosition.latitude === 0 || getPosition.longitude === 0) {
        errors.validate = false;
        errors.position = "Insira a localicação no mapa.";
      }

      return errors;
  }


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    let errorList = validate();
    setErrors(errorList);
    if (validate()) {
      const data = new FormData();
      data.append('_method', "PUT");
      data.append('name', String(getName));
      data.append('about', String(getAbout));
      data.append('category_id', String(getSelectedCategory));
      data.append('user_id', String(user.id));
      data.append('website', String(getSite));
      data.append('facebook', String(getFacebook));
      data.append('instagram', String(getInstagram));
      data.append('youtube', String(getYoutube));
      data.append('whatsappNumber', String(getWhatsapp));
      data.append('phoneNumber', String(getPhoneNumber));
      data.append('pointStatus', String(true));
      data.append('petFriendly', String(getPetFriendly));
      data.append('sponsored', String(false));
      data.append('openOnWeekends', String(getOpeningOnWeekends));
      data.append('openingHours', String(getOpeningHours));
      data.append('latitude', String(getPosition.latitude));
      data.append('longitude', String(getPosition.longitude));
 
      getImages.map((image, index) => {
        data.append('images', getImages[index]);
      });
      
      const createTouristicPointUrl = `touristicpoint/${params.id}`;
      const response = await api.post(createTouristicPointUrl, data);
      console.log(response);
      navigate(`/touristic-point/${params.id}`);
    }
  }

  function isEmpty(obj: Errors) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return true;
    }
    return false;
  }

  const Markers = () => {

    const map = useMapEvents({
        click(event) {                                
          const { lat, lng } = event.latlng;
          setPosition({
            latitude: lat,
            longitude: lng,
          });                
        },            
    })

    return (
        getPosition ? 
            <Marker           
            key={getPosition.latitude}
            interactive={false}
            icon={mapIcon}
            position={[getPosition.latitude, getPosition.longitude]}
            />
        : null
    )   
  }

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
      }
    });
    return null;
  }

  return (
    <div> 
      <form onSubmit={handleSubmit} className="create-touristic-point-form" encType="multipart/form-data">
        <fieldset>
          <legend>Dados Ponto Turístico</legend>

          <MapContainer
            center={[-22.588334, -46.524675]}
            style={{ width: '100%', height: 280 }}
            zoom={14}
          >
            <Markers />
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWRyaWFub2xpbWE2NDUiLCJhIjoiY2tnOHAyOWFmMDA5eDJxcDVuM3FwbDBlbCJ9.vJxoMiSdFI5-fZrXZspTrQ`}
            />

            <MyComponent />
          </MapContainer>
          {errors.position && <span className='fieldErrorMessage'>{errors.position}</span>}

          <InputText
            id="name"
            name="name"
            value={getName}
            type="text"
            label="Nome"
            onChange={(event) => setName(event.target.value)}
            required={true}
            placeholder=""
            maxLength={60}
          />
          {errors.name && <span className='fieldErrorMessage'>{errors.name}</span>}

          <Textarea
            id="about"
            name="about"
            value={getAbout}
            label="Sobre"
            helpText='Máximo de 300 caracteres'
            onChange={(event) => setAbout(event.target.value)}
            required={true}
            placeholder=""
            maxLength={300}
            rows={8}
          />
          {errors.about && <span className='fieldErrorMessage'>{errors.about}</span>}

          <div className="input-block">
            <label htmlFor="categoria">Categoria</label>
            <select value={getSelectedCategory} onChange={handleCategory}>
              {getCategories.map((category) => {
                return <option key={category.id} value={category.id}>{category.title}</option>;
              })}
            </select>
          </div>

          <div className="input-block">
            <label>Fotos</label>

            <div className="images-container">
              {getPreviewImages.map((image) => {
                return <img key={image} src={image} alt={image} />;
              })}
              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
            </div>
            <input
              multiple
              onChange={handleSelectImages}
              type="file"
              id="image[]"
            />
          </div>
        </fieldset>
        {errors.image && <span className='fieldErrorMessage'>{errors.image}</span>}

        <fieldset>
          <legend>Funcionamento</legend>

          <InputText
            id="openingHours"
            name="openingHours"
            value={getOpeningHours}
            type="text"
            label="Horário de funcionamento"
            onChange={(event) => setOpeningHours(event.target.value)}
            required={true}
            placeholder=""
            maxLength={25}
            helpText='Ex.: Das 8h às 18h'
          />
          {errors.openingHours && <span className='fieldErrorMessage'>{errors.openingHours}</span>}

          <Checkbox 
            id="openOnWeekends"
            name="openOnWeekends"
            value={getOpeningOnWeekends === true ? 'checked' : ''}
            label="Atende fim de semana"
            onChange={(event) => setOpeningOnWeekends(event.target.checked)}
            required={false}
          />

          <Checkbox 
            id="petFriendly"
            name="petFriendly"
            value={getPetFriendly === true ? 'checked' : ''}
            label="Pet friendly"
            onChange={(event) => setPetFriendly(event.target.checked)}
            required={false}
            />
        </fieldset>

        <fieldset>
          <legend>Informações Patrocinado</legend>

          <InputText
            id="site"
            name="site"
            value={getSite}
            type="text"
            label="Site"
            onChange={(event) => setSite(event.target.value)}
            required={false}
            placeholder=""
            maxLength={30}
          />

          <InputText
            id="facebook"
            name="facebook"
            value={getFacebook}
            type="text"
            label="Facebook"
            onChange={(event) => setFacebook(event.target.value)}
            required={false}
            placeholder=""
            maxLength={30}
          />

          <InputText
            id="instagram"
            name="instagram"
            value={getInstagram}
            type="text"
            label="Instagram"
            onChange={(event) => setInstagram(event.target.value)}
            required={false}
            placeholder=""
            maxLength={30}
          />

          <InputText
            id="youtube"
            name="youtube"
            value={getYoutube}
            type="text"
            label="Youtube"
            onChange={(event) => setYoutube(event.target.value)}
            required={false}
            placeholder=""
            maxLength={30}
          />

          <InputText
            id="whatsapp"
            name="whatsapp"
            value={getWhatsapp}
            type="tel"
            label="WhatsApp"
            onChange={(event) => setWhatsapp(event.target.value)}
            required={false}
            placeholder=""
            maxLength={11}
          />

          <InputText
            id="phoneNumber"
            name="phoneNumber"
            value={getPhoneNumber}
            type="text"
            label="Telefone"
            onChange={(event) => setPhoneNumber(event.target.value)}
            required={false}
            placeholder=""
            maxLength={11}
          />
        </fieldset>

        <Button
          id="submitCreateButton"
          name="submitCreateButton"
          type="submit"
          styleButton="confirm-button"
          label="Confirmar"
        />
      </form>
    </div>
  );
}