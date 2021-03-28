import React, { useState } from "react";

import OpportunityEditorLayout from "../../../../components/admin/OpportunityEditorLayout";
import useAuth from "../../../../hooks/useAuth";
import { useRouter } from "next/router";

const CreateOpportunityPage: React.FC = () => {
  useAuth();

  const [image, setImage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const createOpportunity = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const files = e.target.image.files;
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "school-website-images");

      const imageRes = await fetch("https://api.cloudinary.com/v1_1/dmdtixluw/image/upload", {
        method: "POST",
        body: formData,
      });
      const file = await imageRes.json();

      const res = await fetch("/api/opportunities", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          description: e.target.description.value,
          contactEmail: e.target.contactEmail.value,
          imageUrl: file.secure_url,
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

  return (
    <>
      <OpportunityEditorLayout
        onSubmit={createOpportunity}
        image={image}
        setImage={setImage}
        isLoading={isLoading}
      />
    </>
  );
};

export default CreateOpportunityPage;
