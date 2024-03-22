import { useUserProfileQuery } from '../../hooks/queries';

export default function ProfilePage() {
  const profile = useUserProfileQuery();

  console.log(
    'loading: ',
    profile.isLoading,
    'data: ',
    profile.data,
    'error: ',
    profile.isError
  );

  if (profile.isLoading) return <div>Loading...</div>;

  if (profile.isError) return <div>Error...</div>;

  return <div>{/* display name,  */}</div>;
}
