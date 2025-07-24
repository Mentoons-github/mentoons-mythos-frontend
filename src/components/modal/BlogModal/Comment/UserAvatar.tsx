import { User2 } from "lucide-react";

interface UserAvatarProps {
  profile?: string;
  username: string;
  size?: 'sm' | 'md';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ profile, username, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5'
  };

  return profile ? (
    <img 
      src={profile} 
      alt={username} 
      className={`${sizeClasses[size]} rounded-full object-cover`} 
    />
  ) : (
    <div className={`${sizeClasses[size]} rounded-full bg-gray-300 flex items-center justify-center`}>
      <User2 className={`${iconSizes[size]} text-gray-600`} />
    </div>
  );
};

export default UserAvatar