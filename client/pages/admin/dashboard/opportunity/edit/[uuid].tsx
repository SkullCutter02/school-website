import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import OpportunityEditorLayout from "../../../../../components/admin/OpportunityEditorLayout";
import useAuth from "../../../../../hooks/useAuth";
import { Opportunity } from "../../../../../types/Opportunity";
import uploadImage from "../../../../../utils/uploadImage";

const EditOpportunityPage = () => {
  useAuth();

  const [image, setImage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { uuid } = router.query;

  const editOpportunity = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const file = await uploadImage(e.target.image.files);

      const res = await fetch(`/api/opportunities/${uuid}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value.trim(),
          description: e.target.description.value.trim().replaceAll(/(?:\r|\n|\r\n)/g, "<br/>"),
          contactEmail: e.target.contactEmail.value.trim(),
          imageUrl: file.error ? data.imageUrl : file.secure_url,
        }),
      });

      if (res.ok) {
        await router.push("/admin/dashboard");
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const fetchOpportunity = async () => {
    const res = await fetch(`/api/opportunities/${uuid}`);
    return await res.json();
  };

  const { data } = useQuery<Opportunity, Error>(["opportunity", uuid], () => fetchOpportunity(), {
    enabled: !!uuid,
  });

  useEffect(() => {
    if (data) {
      setImage(data.imageUrl);
    }
  }, [data]);

  return (
    <>
      <OpportunityEditorLayout
        onSubmit={editOpportunity}
        setImage={setImage}
        isLoading={isLoading}
        image={image}
        headerText={"Edit Opportunity"}
        defaultName={data?.name}
        defaultDescription={data?.description.replaceAll("<br/>", "\n")}
        defaultContactEmail={data?.contactEmail}
        buttonText={"Update Opportunity"}
      />
    </>
  );
};

export default EditOpportunityPage;
