import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Clock, MapPin, ArrowRight, Users } from 'lucide-react';
import type { CommunityPost } from '@/types';

const communityPosts: CommunityPost[] = [
  {
    id: '1',
    author: '김개발자',
    avatar: '👨‍💻',
    location: '제주시',
    timeAgo: '2시간 전',
    content: '제주에서 3개월째 살고 있는데 정말 만족해요! 특히 애월 카페거리에서 작업하기 좋고, 생각보다 인터넷도 빠르고... 다만 겨울에는 바람이 좀 세네요 😅 내년에도 제주에 있을 계획입니다!',
    likes: 24,
    comments: 12
  },
  {
    id: '2',
    author: '서울러',
    avatar: '👩‍🎨',
    location: '서울 강남',
    timeAgo: '5시간 전',
    content: '강남 코워킹 스페이스 추천받고 싶어요! 현재 선릉역 근처에서 작업 중인데, 좀 더 조용하고 집중할 수 있는 곳이 있을까요? 월 20만원 정도 예산이에요.',
    likes: 18,
    comments: 31
  },
  {
    id: '3',
    author: '부산갈매기',
    avatar: '🏄‍♀️',
    location: '부산 해운대',
    timeAgi: '1일 전',
    content: '해운대에서 서핑하고 일하는 삶 너무 좋아요 🏄‍♀️ 아침에 서핑하고 오후에 카페에서 작업! 생활비도 서울보다 훨씬 저렴하고... 부산 노마드 모임도 있어요!',
    likes: 45,
    comments: 8
  }
];

function PostCard({ post }: { post: CommunityPost }) {
  const getTimeAgo = (timeAgo: string) => {
    return post.timeAgo || timeAgo;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
              {post.avatar}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-semibold text-gray-900">{post.author}</h4>
              <Badge variant="outline" className="flex items-center space-x-1 text-xs">
                <MapPin className="h-3 w-3" />
                <span>{post.location}</span>
              </Badge>
              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                <Clock className="h-3 w-3" />
                <span>{getTimeAgo(post.timeAgo)}</span>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-4 group-hover:text-gray-900 transition-colors">
              {post.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm">공유</span>
                </button>
              </div>
              
              <Badge variant="secondary" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                더 보기
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CommunitySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Users className="h-8 w-8 text-green-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">실시간 커뮤니티</h2>
          </div>
          <p className="text-lg text-gray-600">
            전국의 디지털 노마드들이 나누는 생생한 경험과 정보
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {communityPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              💬 지금 바로 커뮤니티에 참여해보세요!
            </h3>
            <p className="text-gray-600 mb-6">
              궁금한 것들을 질문하고, 경험을 공유하며, 새로운 노마드 친구들을 만나보세요
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl mb-2">🙋‍♀️</div>
                <h4 className="font-semibold mb-1">질문하기</h4>
                <p className="text-gray-600">궁금한 도시나 지역에 대해 물어보세요</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl mb-2">📝</div>
                <h4 className="font-semibold mb-1">경험 공유</h4>
                <p className="text-gray-600">나만의 노마드 경험을 공유해보세요</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl mb-2">👥</div>
                <h4 className="font-semibold mb-1">모임 참여</h4>
                <p className="text-gray-600">지역별 노마드 모임에 참여하세요</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-3 text-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                커뮤니티 참여하기
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                더 많은 포스트 보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}