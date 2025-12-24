'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/styles/subcategory.module.scss';
import Chatbot from '@/components/Chatbot';

export default function SubcategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  const categoryName = searchParams.get('name');

  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      fetchSubcategories();
    }
  }, [categoryId]);

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(`/api/subcategories?categoryId=${categoryId}`);
      if (response.ok) {
        const data = await response.json();
        setSubcategories(data.subcategories || []);
      }
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className={styles.subcategoryContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>
        <h1 className={styles.headerTitle}>{categoryName || 'Subcategories'}</h1>
      </div>

      {loading ? (
        <div className={styles.emptyState}>
          <p>Loading...</p>
        </div>
      ) : subcategories.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No subcategories found</p>
        </div>
      ) : (
        <div className={styles.subcategoryList}>
          {subcategories.map((subcategory) => (
            <div key={subcategory.id} className={styles.subcategoryCard}>
              <h3 className={styles.subcategoryName}>{subcategory.name}</h3>
              <p className={styles.subcategoryDescription}>{subcategory.description}</p>
            </div>
          ))}
        </div>
      )}

      <Chatbot categoryId={categoryId} categoryName={categoryName} />
    </div>
  );
}
