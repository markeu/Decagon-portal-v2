import React from "react";
import styled from "styled-components";



function Card({ imageUrl, subject, topic }) {
	return (
		<Container>
			<IconBackground>
				<img src={imageUrl} alt="quizLogo" />
      </IconBackground>
        {subject.map((e) => (
        <div key={e._id} className="">
          <h2 className="mt-2 font-bold text-gray-800">Location: {e.street}</h2>
          <p className="mb-6 text-sm text-gray-800">State: {e.state}</p>
        </div>
        ))}
		</Container>
	);
}

const IconBackground = styled.div`
	height: 100%;
	width: 100%;
	background: linear-gradient(
		148.78deg,
		rgba(196, 196, 196, 0.3) -10.57%,
		rgba(196, 196, 196, 0) 92.53%
    );
  ${'' /* position: relative; */}
	border-radius: 50%;
`;

const Container = styled.div`
	width: 17rem;
  height: 16rem;
	background: #293146;
	color: #fff;
	border-radius: 1rem;
	padding: 0.2rem 0.4rem;
  margin-bottom: 4rem;
	position: relative;
	& img {
		position: absolute;
        width: 100%;
        height: 90%;
        border-radius: 1rem;
        ${'' /* top: 50%; */}
        ${'' /* left: 50%; */}
        ${'' /* transform: translate(-50%, -50%); */}
	}
`;

export default Card;
