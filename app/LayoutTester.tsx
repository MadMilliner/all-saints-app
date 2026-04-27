/**
 * Test loading and error layouts for NextJS's app dir.
 * @param searchParams
 * @returns Promise
 */
export const layoutTester = async (searchParams: Record<string, string | string[] | undefined>) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const loadingValue = Array.isArray(searchParams.loading)
    ? searchParams.loading[0]
    : searchParams.loading;
  if (typeof loadingValue !== 'undefined') {
    const loading = parseInt(loadingValue || '2000');
    await new Promise((resolve) => setTimeout(resolve, loading));
  }

  const errorValue = Array.isArray(searchParams.error)
    ? searchParams.error[0]
    : searchParams.error;
  if (typeof errorValue !== 'undefined') {
    const error = errorValue || 'Something went wrong!';
    await new Promise((_resolve, reject) => reject(error));
  }
};
