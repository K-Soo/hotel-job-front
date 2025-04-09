import useRequestFCMPermission from '@/hooks/useRequestFCMPermission';

export default function AppComponent() {
  useRequestFCMPermission();

  return null;
}
