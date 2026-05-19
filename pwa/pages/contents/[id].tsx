import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Icon from "../../components/atoms/Icon";
import HomeTemplate from "../../components/templates/HomeTemplate";
import MovieDetail from "../../components/organisms/MovieDetail";
import { getContentById } from "../../services/api/contentsApi";
import { ROUTES } from "../../routes/routes";

export default function MoviePage() {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getContentById(id)
      .then((data) => {
        if (!data?.id) {
          router.push(ROUTES.HOME);
          return;
        }
        setContent(data);
      })
      .catch(() => {
        router.push(ROUTES.HOME);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <HomeTemplate>
        <p className="flex items-center justify-center gap-2 text-gray-400 py-12">
          <Icon name="loading" className="animate-spin" />
          Chargement...
        </p>
      </HomeTemplate>
    );
  }

  return (
    <HomeTemplate>
      {content && <MovieDetail content={content} />}
    </HomeTemplate>
  );
}
