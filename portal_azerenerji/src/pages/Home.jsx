import React, { useEffect, useState } from 'react';
import { Container, Wrap, WrapItem, Center, Image } from '@chakra-ui/react';
import logo from '../images/AzerenerjiLogo-removebg-preview.png';

const Home = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('http://localhost:3000/websites')
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	
	return (
		<>
			<Container maxW='xxl' mt='40px'>
				<Container mb='40px'>
					<Center>
						<div class='cardHomeLogo'>
							<div class='cardHomeLogoBg'>
								<Image className='logoAzerenerji' objectPosition='center' objectFit='' src={logo} alt='Azerenerji logo'></Image>
							</div>
							<div class='cardHomeLogoBlob'></div>
						</div>
					</Center>
				</Container>
				<Wrap spacing='50px' justify='center'>
					{data.map((item) => (
						<WrapItem>
							<Center w='360px' h='300px'>
								<div className='homeCard'>
									<p className='homeHeading'>{item.name}</p>
									<p>AzərEnerji ASC</p>
								</div>
							</Center>
						</WrapItem>
					))}
				</Wrap>
			</Container>

			{/* <Link to='route' target='_blank' rel='noopener noreferrer' /> */}
		</>
	);
};

export default Home;
