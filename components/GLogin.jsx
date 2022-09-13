import { GoogleLogin } from '@react-oauth/google';
import { useUIStore } from '#store';

export default function GLogin() {
  const oAuthLogin = useUIStore((state) => state.oAuthLogin);
  const onSuccess = (res) => {
    console.log(res);
    const { credential } = res;
    oAuthLogin(credential);
  };
  const onError = (err) => {
    console.log('failed:', err);
  };
  return <GoogleLogin onSuccess={onSuccess} onError={onError} />;
}
