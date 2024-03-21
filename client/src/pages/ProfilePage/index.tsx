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

  return <div>ProfilePage</div>;
}
