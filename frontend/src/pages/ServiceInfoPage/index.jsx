import { Stack, styled, Typography } from "@mui/material";
import React from "react";
import maleAst from "../../assets/v4DesignImages/Patners/maleast.png";
import femaleAst from "../../assets/v4DesignImages/Patners/femaleast.png";

const ServiceInfoWrapper = styled("div")(({ theme }) => ({}));

const ServiceInfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
}));

const AgentInfoWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "110px",
  padding: theme.spacing(2),
  background: "#000000",
}));
const AgentInfoSection = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  width: "100%",
  marginLeft: "10px",
}));

const AgentImageContainer = styled(Stack)(({ theme, type }) => ({
  height: "100px",
  width: "100px",
  borderRadius: "50%",
  backgroundImage: type === "male" ? `url(${maleAst})` : `url(${femaleAst})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

// backgroundImage: type === "male" ? `url(${maleAst})` : `url(${femaleAst})`,
// backgroundSize: "cover",
// backgroundPosition: "center",

const ServiceInfoPage = () => {
  const genderType = sessionStorage.getItem("genderType");

  return (
    <ServiceInfoWrapper>
      <ServiceInfoContainer>
        <AgentInfoWrapper>
          <Stack flex={1}>
            <AgentImageContainer type={genderType} />
          </Stack>
          <AgentInfoSection>
            {genderType === "male" ? (
              <>
                <Typography
                  sx={{
                    fontFamily: "plus jakarta sans bold",
                    fontSize: "2.5rem",
                    color: "white",
                  }}
                >
                  Rajesh
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "white",
                  }}
                >
                  Loan / Insurance Specialist
                </Typography>
              </>
            ) : (
              <></>
            )}
          </AgentInfoSection>
        </AgentInfoWrapper>
      </ServiceInfoContainer>
    </ServiceInfoWrapper>
  );
};

export default ServiceInfoPage;
