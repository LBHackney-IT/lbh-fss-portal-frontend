import React from "react";
import Button from "../../../components/Button/Button";
import { red } from "../../../settings/colors";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AppLoading from "../../../AppLoading";
import { Link, navigate } from "@reach/router";

const StyledTaxonomyItemContainer = styled.div`
  display: flex;
  max-width: 438px;
  justify-content: space-between;
`;

const StyledTaxonomyItem = styled.p`
  font-size: 18px;
  margin: 8px 0;
`;

const StyledDeleteTaxonomyItem = styled.p`
  display: flex;
  align-items: center;
  margin: 8px 0 8px 10px;
`;

const TaxonomyPanel = ({
  vocabularyName,
  taxonomy,
  toggleRemoveModal,
  setSelectedTerm,
  titleStyle,
}) => {
  let vocabularyId = "";

  if (taxonomy[0]) {
    vocabularyId = taxonomy[0].vocabulary_id;
  }

  if (taxonomy.length === 0) {
    return (
      <>
        <h2 style={titleStyle}>{vocabularyName}</h2>
        <AppLoading margin={"0 30px"} />
      </>
    );
  }

  return (
    <>
      <h2 style={titleStyle}>{vocabularyName}</h2>
      <div style={{ margin: "20px 0 40px 0" }}>
        {taxonomy.map((term, index) => {
          return (
            <div key={index}>
              <StyledTaxonomyItemContainer>
                <StyledTaxonomyItem>
                  <Link
                    to={`/taxonomies/${vocabularyName}/${vocabularyId}/${term.id}/edit`}
                  >
                    {term.label}
                  </Link>
                </StyledTaxonomyItem>

                <StyledDeleteTaxonomyItem>
                  <Button
                    label="X"
                    backgroundColor={red[400]}
                    buttonStyle={{
                      padding: "0",
                      margin: "0",
                      height: "26px",
                      width: "25px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      toggleRemoveModal();
                      setSelectedTerm(term);
                    }}
                  />
                </StyledDeleteTaxonomyItem>
              </StyledTaxonomyItemContainer>
            </div>
          );
        })}
      </div>

      <Button
        label={"Add term"}
        onClick={() =>
          navigate(`/taxonomies/${vocabularyName}/${vocabularyId}/add`)
        }
      />
    </>
  );
};

export default TaxonomyPanel;
