import React, { useState, useRef } from "react";

import OpportunityEditorLayout from "../../../../components/admin/OpportunityEditorLayout";
import useAuth from "../../../../hooks/useAuth";
import { useRouter } from "next/router";
import uploadImage from "../../../../utils/uploadImage";

const CreateOpportunityPage: React.FC = () => {
  useAuth();

  const [image, setImage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const errMsgRef = useRef<HTMLParagraphElement>();

  const createOpportunity = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const file = await uploadImage(e.target.image.files);

      const res = await fetch("/api/opportunities", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value.trim(),
          description: e.target.description.value.trim().replaceAll(/(?:\r|\n|\r\n)/g, "<br/>"),
          contactEmail: e.target.contactEmail.value.trim(),
          imageUrl: file.secure_url,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        await router.push("/admin/dashboard");
      } else {
        if (data.error) {
          errMsgRef.current.textContent = data.error;
        } else {
          errMsgRef.current.textContent = "Something went wrong";
        }

        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <OpportunityEditorLayout
        onSubmit={createOpportunity}
        image={image}
        setImage={setImage}
        isLoading={isLoading}
        headerText={"Create Opportunity"}
        errMsgRef={errMsgRef}
      />
    </>
  );
};

export default CreateOpportunityPage;
